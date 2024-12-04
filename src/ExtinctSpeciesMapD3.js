import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { countries } from './datajson';
import { info } from './catrgoryInfo';
import { IsoCode } from './Code_ISO_2.js';
import { code } from './Code_ISO';
import ThreatenedSpeciesPie from './ThreatenedSpeciesPie';
import Dropdown from './Dropdown.jsx';
import LineGraph from './LineGraph.jsx';
import BarChart from './BarChart.js';
import StackedBarChart from './StackedBar.jsx';

const ExtinctSpeciesMapD3 = () => {
  const svgRef = useRef(null);
  const [selectedCountries, setSelectedCountries] = useState([]); // State to manage selected countries
  const [selectedCategory, setSelectedCategory] = useState('All Species'); // Managed by the parent component
  const [countryData, setCountryData] = useState({});
  const [expalnation, setExplantion] = useState(null);

  const categoryColors = {
    Mammals: '#ffcccb', // Light pink
    Birds: '#d4edda', // Light green
    Reptiles: '#c3e6cb', // Mint green
    Amphibians: '#ffeeba', // Light yellow
    Fishes: '#bee5eb', // Light blue
    Molluscs: '#f5c6cb', // Light coral
    'Other Inverts': '#d1ecf1', // Cyan
    Plants: '#d8f3dc', // Pale green
    Fungi: '#f3e5ab', // Wheat
    Chromists: '#f0e5cf', // Beige
    'All Species': '#f7f4ea', // Default color
  };


  const countryCodeLookup = IsoCode.reduce((obj, country) => {
    obj[country['country-code']] = country.name;
    return obj;
  }, {});

  const getCountryNameByCode = (code) => {
    return countryCodeLookup[code] || null;
  };

  // Function to clear all selected countries
  const clearSelections = () => {
    setSelectedCountries([]);
  };

  useEffect(() => {
    // Reset selected countries whenever the category changes
    setSelectedCountries([]);

    // Map country data to the selected category
    const categoryKey = selectedCategory === 'All Species' ? 'Total' : selectedCategory;
    const countryText = Object.fromEntries(
      countries
        .map(item => {
          const countryCode = code[item.Name];
          return [countryCode, item[categoryKey] || 0]; // Default to 0 if no data for the category
        })
        .filter(([key]) => key)
    );
    setCountryData(countryText);

    // Fetch the world map TopoJSON
    fetch('https://unpkg.com/world-atlas/countries-50m.json')
      .then((response) => response.json())
      .then((data) => {
        const svg = d3.select(svgRef.current);
        const width = 1100;
        const height = 450;

        const projection = d3.geoEqualEarth().scale(160).translate([width / 2, height / 2]);
        const path = d3.geoPath(projection);

        const colorScale = d3.scaleQuantize()
          .domain([0, d3.max(Object.values(countryText))])
          .range(d3.schemeReds[9]);

        const countries = topojson.feature(data, data.objects.countries).features;

        // Clear previous map elements
        svg.selectAll('path.country').remove();
        svg.selectAll('path.graticule').remove();
        svg.selectAll('.legend').remove(); // Clear old legend

        const graticule = d3.geoGraticule()
          .extent([[-180.1, -90.1], [180.1, 90.1]]);
        svg.append('path')
          .datum(graticule)
          .attr('class', 'graticule')
          .attr('d', path)
          .attr('fill', 'none')
          .attr('stroke', '#ccc')
          .attr('stroke-width', 0.8)
          .attr('stroke-dasharray', '2,2'); // Dashed lines for better aesthetics

        // Draw updated map
        svg.selectAll('path.country')
          .data(countries)
          .enter()
          .append('path')
          .attr('class', 'country')
          .attr('d', path)
          .attr('fill', d => {
            console.log(countryText, d.id, d.properties.name, d, "--------")
            const value = countryText[d.id] || 0;
            return colorScale(value);
          })
          .attr('stroke', '#333')
          .attr('stroke-width', 0.5)
          .on('mouseover', function (event, d) {
            const countryName = d.properties.name;
            const speciesCount = countryText[d.id] || '0';
            d3.select(this)
              .style('cursor', 'pointer')
              .attr('fill', '#EDED00');

            d3.select('#map-tooltip')
              .style('opacity', 1)
              .html(`${countryName}: ${speciesCount} species`);
          })
          .on('mousemove', (event) => {
            d3.select('#map-tooltip')
              .style('left', (event.pageX + 5) + 'px')
              .style('top', (event.pageY - 28) + 'px');
          })
          .on('mouseout', function () {
            d3.select(this)
              .attr('fill', d => {
                const value = countryText[d.id] || 0;
                return colorScale(value);
              });
            d3.select('#map-tooltip').style('opacity', 0);
          })
          .on('click', function (event, d) {
            const countryID = d.id;
            const countryName = getCountryNameByCode(countryID);

            // Toggle the selection state
            setSelectedCountries(prevSelected => {
              if (prevSelected.includes(countryName)) {
                return prevSelected.filter(country => country !== countryName);
              } else {
                return [...prevSelected, countryName];
              }
            });
          });
        const legendWidth = 300;
        const legendHeight = 15;
        const maxValue = d3.max(Object.values(countryText));
        const legendMax = maxValue <= 100
          ? Math.ceil(maxValue / 10) * 10
          : maxValue <= 1000
            ? Math.ceil(maxValue / 100) * 100
            : Math.ceil(maxValue / 1000) * 1000;

        // Append legend group to the SVG
        const legendGroup = svg.append('g').attr('class', 'legend')
          .attr('transform', `translate(${50}, ${height})`);

        const defs = svg.append('defs');
        const gradient = defs.append('linearGradient')
          .attr('id', 'legend-gradient');

        colorScale.range().forEach((color, i) => {
          gradient.append('stop')
            .attr('offset', `${(i / (colorScale.range().length - 1)) * 100}%`)
            .attr('stop-color', color);
        });

        legendGroup.append('rect')
          .attr('width', legendWidth)
          .attr('height', legendHeight)
          .style('fill', 'url(#legend-gradient)')
          .attr('stroke', '#ccc')
          .attr('stroke-width', 0.5);

        // Create a scale for the legend
        const legendScale = d3.scaleLinear()
          .domain([0, legendMax])
          .range([0, legendWidth]);


        legendGroup.append('g')
          .attr('transform', `translate(0, ${legendHeight})`)
          .call(d3.axisBottom(legendScale)
            .ticks(2)
            .tickValues([0, legendMax])
            .tickSize(5)
            .tickFormat(d3.format("d"))
          )
          .call(g => g.select('.domain').remove());
      })
      .catch((error) => console.error('Error fetching or processing TopoJSON data:', error));

    const temp = info.find(
      (item) => item.category === selectedCategory
    )?.description;
    setExplantion(temp);
  }, [selectedCategory]);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('path.country')
      .attr('stroke-width', (pathData) => {

        return selectedCountries.includes(getCountryNameByCode(pathData.id)) ? 1.5 : 0.5;
      });
  }, [selectedCountries]);

  return (
    <div>


      {/* Dropdown and Clear button section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          margin: '15px',
          padding: '10px 30px 10px 30px',
          // backgroundColor: '#f7f4ea', // Light background for better contrast
          backgroundColor: categoryColors[selectedCategory],
          borderRadius: '8px', // Rounded corners
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Subtle shadow for depth
        }}
      >
        <Dropdown
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {selectedCategory && (
          <div
            style={{
              maxWidth: '50%', // Limit the width to avoid overlapping with the button
              marginLeft: '20px', // Add spacing from the dropdown
              padding: '10px',
              backgroundColor: '#e9ecef', // Subtle contrast background
              border: '1px solid #ced4da', // Light border for definition
              borderRadius: '4px',
              fontSize: '18px',
              color: '#495057',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)', // Light shadow for depth
              textAlign: 'left', // Align text to the left for readability
            }}
          >
            <strong>Category Explanation:</strong>
            <p style={{ margin: '5px 0 0' }}>{expalnation}</p>
          </div>
        )}
        <button
          onClick={clearSelections}
          style={{
            padding: '8px 16px', // Larger padding for better click target
            backgroundColor: '#3e5c76', // Bootstrap-like danger red
            color: '#fff',
            border: 'none',
            borderRadius: '4px', // Rounded corners for a modern look
            cursor: 'pointer',
            fontSize: '18px',
            transition: 'background-color 0.3s', // Smooth hover effect
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#748cab')} // Darker red on hover
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#3e5c76')}
        >
          Clear All Selections
        </button>
      </div>
      <h2>Threatened Species Across the World: A Country-Wise View for 2024</h2>
      <div
        style={{
          position: 'relative',
          backgroundColor: '#f7f4ea',
          border: '1px solid #ccc',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          padding: '20px',
          margin: '20px auto',
          maxWidth: '1100px',
        }}
      >
        <svg ref={svgRef} width="100%" height="490"></svg>
      </div>
      <div
        id="map-tooltip"
        style={{
          position: 'absolute',
          textAlign: 'center',
          width: 'auto',
          height: 'auto',
          padding: '5px',
          fontSize: '12px',
          background: 'lightsteelblue',
          border: '1px solid #333',
          borderRadius: '8px',
          pointerEvents: 'none',
          opacity: 0
        }}
      ></div>
      {selectedCountries.length > 0 && selectedCountries.some((country) => country !== null) && <>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            padding: '20px',
            backgroundColor: '#f7f4ea',
            borderRadius: '8px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            maxWidth: '100%',
            margin: '20px auto',
            gap: '20px',
          }}
        >
          <div style={{ flex: '1', textAlign: 'center' }}>
            <h2
              style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '15px',
              }}
            >
              Line Chart: Species Extinction Rate
            </h2>
            <LineGraph selectedCountries={selectedCountries} />
          </div>

          <div style={{ flex: '1', textAlign: 'center' }}>
            <h2
              style={{
                fontSize: '1.2rem',
                fontWeight: '600',
                color: '#333',
                marginBottom: '15px',
              }}
            >
              Bar Chart: No. of {selectedCategory === 'All Species' ? 'Species' : selectedCategory} that could go Extinct in 2024
            </h2>
            <BarChart selectedCountries={selectedCountries} selectedCategory={selectedCategory} />
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#f7f4ea', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '20px', textAlign: 'center' }}>
            Pie Charts for Selected Countries:
          </h2>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#333', marginBottom: '20px', textAlign: 'center' }}>
            Please hover over the pie chart and click on the categories to see interactions.
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            {selectedCountries.map((country, index) => {
              const countryInfo = countries.find(item => item.Name === country);
              if (countryInfo) {
                return (
                  <div
                    key={index}
                    style={{
                      // width: '200px',
                      // height: '240px', // Additional height for the label
                      backgroundColor: '#fff',
                      borderRadius: '8px',
                      boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px',
                    }}
                  >
                    <div style={{ fontSize: '1rem', fontWeight: '500', color: '#555', textAlign: 'center' }}>
                      {country}
                    </div>
                    <ThreatenedSpeciesPie
                      data={countryInfo}
                      selected={selectedCountries}
                      label={index === 0}
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>

        <div style={{ padding: '20px', backgroundColor: '#f7f4ea', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '20px', textAlign: 'center' }}>
            Stacked Bar Charts for Selected Countries:
          </h2>
          <h2 style={{ fontSize: '1rem', fontWeight: '600', color: '#333', marginBottom: '20px', textAlign: 'center' }}>
            Please hover over the bar chart and click on the categories to see interactions.
          </h2>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '20px',
            }}
          >
            <div
              style={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px',
                width: '90%',
                height: '90vh'
              }}
            >

              <StackedBarChart
                selectedCountryNames={selectedCountries}
              />
            </div>
          </div>
        </div>
      </>
      }
    </div>
  );
};

export default ExtinctSpeciesMapD3;

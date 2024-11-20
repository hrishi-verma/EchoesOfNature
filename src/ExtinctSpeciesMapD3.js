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

const ExtinctSpeciesMapD3 = () => {
  const svgRef = useRef(null);
  const [selectedCountries, setSelectedCountries] = useState([]); // State to manage selected countries
  const [selectedCategory, setSelectedCategory] = useState('All Species'); // Managed by the parent component
  const [countryData, setCountryData] = useState({});
  const [expalnation, setExplantion] = useState(null);

  const countryCodeLookup = IsoCode.reduce((obj, country) => {
    obj[country['country-code']] = country.name;
    return obj;
  }, {});

  const getCountryNameByCode = (code) => {
    return countryCodeLookup[code] || "Country not found";
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
        const height = 600;

        const projection = d3.geoEqualEarth().scale(160).translate([width / 2, height / 2]);
        const path = d3.geoPath(projection);

        const colorScale = d3.scaleQuantize()
          .domain([0, d3.max(Object.values(countryText))])
          .range(d3.schemeReds[9]);

        const countries = topojson.feature(data, data.objects.countries).features;

        // Clear previous map elements
        svg.selectAll('path.country').remove();
        svg.selectAll('path.graticule').remove();

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
            console.log(countryText, d.id, d, "--------")
            const value = countryText[d.id] || 0;
            return colorScale(value);
          })
          .attr('stroke', '#333')
          .attr('stroke-width', 0.5)
          .on('mouseover', function (event, d) {
            const countryName = d.properties.name;
            const speciesCount = countryText[d.id] || '0';
            d3.select('#map-tooltip')
              .style('opacity', 1)
              .html(`${countryName}: ${speciesCount} species`);
          })
          .on('mousemove', (event) => {
            d3.select('#map-tooltip')
              .style('left', (event.pageX + 5) + 'px')
              .style('top', (event.pageY - 28) + 'px');
          })
          .on('mouseout', () => d3.select('#map-tooltip').style('opacity', 0))
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
      })
      .catch((error) => console.error('Error fetching or processing TopoJSON data:', error));

    const temp = info.find(
      (item) => item.category === selectedCategory
    )?.description;
    setExplantion(temp);
  }, [selectedCategory]); // Only re-run this effect when category changes

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    svg.selectAll('path.country')
      .attr('stroke-width', (pathData) => {
        // Apply thicker stroke if the country is selected
        return selectedCountries.includes(getCountryNameByCode(pathData.id)) ? 1.5 : 0.5;
      });
  }, [selectedCountries]); // This will run whenever selectedCountries changes

  return (
    <div>
      {/* Header for the section */}
      <h2>Threatened Species Across the World: A Country-Wise View</h2>

      {/* Dropdown and Clear button section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          padding: '10px',
          backgroundColor: '#f8f9fa', // Light background for better contrast
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
      <svg ref={svgRef} width="1100" height="600"></svg>
      <div>
        <h1>Bar Chart for Species that could go extinct</h1>
        <BarChart selectedCountries={selectedCountries} selectedCategory={selectedCategory} />
      </div>
      <LineGraph selectedCountries={selectedCountries} />

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
      <h2>Pie charts for selected countries:</h2>
      <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap' }}>
        {selectedCountries.map((country, index) => {
          const countryInfo = countries.find(item => item.Name === country);
          return (
            <div style={{ width: '200px', height: '200px' }} key={index}>
              <div>{country}</div>
              <ThreatenedSpeciesPie
                data={countryInfo}
                selected={selectedCountries}
                label={index === 0}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExtinctSpeciesMapD3;

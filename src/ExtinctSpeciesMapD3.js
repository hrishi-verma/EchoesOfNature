import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { countries } from './datajson';
import { IsoCode } from './Code_ISO_2.js';
import { code } from './Code_ISO';
import ThreatenedSpeciesPie from './ThreatenedSpeciesPie';
import Dropdown from './Dropdown.jsx';
import LineGraph from './LineGraph.jsx';

const ExtinctSpeciesMapD3 = () => {
  const svgRef = useRef(null);
  const [selectedCountries, setSelectedCountries] = useState([]); // State to manage selected countries
  const [selectedCategory, setSelectedCategory] = useState('All Species'); // Managed by the parent component
  const [countryData, setCountryData] = useState({});

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
      <h1>List of Threatened Species per Country</h1>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Dropdown
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        <button
          onClick={clearSelections}
          style={{
            marginLeft: '10px',
            padding: '5px 10px',
            backgroundColor: 'red',
            color: 'white',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Clear All Selections
        </button>
      </div>
      <svg ref={svgRef} width="1100" height="600"></svg>
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

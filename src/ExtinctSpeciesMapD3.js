import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import { countries } from './datajson';
import { code } from './Code_ISO';

const ExtinctSpeciesMap = () => {
  const svgRef = useRef(null);
  const [countryData, setCountryData] = useState({});

  useEffect(() => {
    // Map country data to ISO codes
    const countryText = Object.fromEntries(
      countries
        .map(item => {
          const countryCode = code[item.Name];
          return [countryCode, item.Total];
        })
        .filter(([key]) => key)
    );
    setCountryData(countryText);

    // Fetch the world map TopoJSON
    fetch('https://unpkg.com/world-atlas/countries-50m.json')
      .then((response) => response.json())
      .then((data) => {
        const svg = d3.select(svgRef.current);
        const width = 800;
        const height = 600;

        // Create a projection and path generator
        const projection = d3.geoEqualEarth().scale(160).translate([width / 2, height / 2]);
        const path = d3.geoPath(projection);

        // Create a color scale for extinct species count
        const colorScale = d3.scaleQuantize()
          .domain([0, d3.max(Object.values(countryText))])
          .range(d3.schemeReds[9]);

        // Convert TopoJSON to GeoJSON
        const countries = topojson.feature(data, data.objects.countries).features;

        // Draw each country
        svg.selectAll('path')
          .data(countries)
          .enter()
          .append('path')
          .attr('d', path)
          .attr('fill', d => {
            const value = countryText[d.id] || 0;
            return colorScale(value);
          })
          .attr('stroke', '#333')
          .attr('stroke-width', 0.5)
          .on('mouseover', function (event, d) {
            const countryName = d.properties.name;
            const speciesCount = countryText[d.id] || 'No data';
            d3.select('#tooltip')
              .style('opacity', 1)
              .html(`${countryName}: ${speciesCount} species`);
          })
          .on('mousemove', (event) => {
            d3.select('#tooltip')
              .style('left', (event.pageX + 5) + 'px')
              .style('top', (event.pageY - 28) + 'px');
          })
          .on('mouseout', () => d3.select('#tooltip').style('opacity', 0));
      })
      .catch((error) => console.error('Error fetching or processing TopoJSON data:', error));
  }, [countryData]);

  return (
    <div>
      <h1>List of Threatened Species per Country</h1>
      <svg ref={svgRef} width="800" height="600"></svg>
      <div
        id="tooltip"
        style={{
          position: 'absolute',
          textAlign: 'center',
          width: '120px',
          height: '30px',
          padding: '5px',
          fontSize: '12px',
          background: 'lightsteelblue',
          border: '1px solid #333',
          borderRadius: '8px',
          pointerEvents: 'none',
          opacity: 0
        }}
      ></div>
    </div>
  );
};

export default ExtinctSpeciesMap;

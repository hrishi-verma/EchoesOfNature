import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { ChoroplethController, GeoFeature, ProjectionScale, ColorScale } from 'chartjs-chart-geo'; // Import ColorScale
import * as topojson from 'topojson';
// import { countries } from './countries';
import { countries } from './datajson';
import { code } from './Code_ISO';
// import { listOfCountries } from './listOfCountries';
Chart.register(...registerables, ChoroplethController, GeoFeature, ProjectionScale, ColorScale); // Register ColorScale

const ExtinctSpeciesMap = () => {
  const chartRef = useRef(null);
  const [countryCodes, setCountryCodes] = useState([]);
  const [countryData, setCountryData] = useState([]);


  useEffect(() => {
    
    const countryTExt = Object.fromEntries(
      countries
        .map(item => {
          const countryCode = code[item.Name];
          console.log(`Mapping: ${item.Name} -> ${countryCode}, Total: ${item.Total}`);
          return [countryCode, item.Total]; 
        })
        .filter(([key]) => key) 
    );
    setCountryData(countryTExt, "+++++++++++");
    
    fetch('https://unpkg.com/world-atlas/countries-50m.json')
      .then((response) => response.json())
      .then((data) => {
        
        const countries = topojson.feature(data, data.objects.countries).features;

        
        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
          type: 'choropleth',
          data: {
            labels: countries.map((d) => d.properties.name),
            datasets: [{
              label: 'Extinct Species Count',
              data: countries.map((d) => {
                
                const countryCode = d.id;
                console.log(d, countryTExt[countryCode], countryCode,);

                return {
                  feature: d,
                  value: countryTExt[countryCode] || 0
                };
              }),
            }]
          },
          options: {
            showOutline: true,
            showGraticule: true,
            scales: {
              projection: {
                axis: 'x',
                projection: 'equalEarth'
              },
              color: {  
                axis: 'y',
                quantize: 40,
                interpolate: "reds",
                
              }
            },
            plugins: {
              legend: {
                display: false 
              }
            }
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching or processing TopoJSON data:', error);
      });
  }, []);



  return (
    <div>
      <h1>List of threatened species per countries</h1>
      <canvas ref={chartRef} width="800" height="600"></canvas>
    </div>
  );
};

export default ExtinctSpeciesMap;



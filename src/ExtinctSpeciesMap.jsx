import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { ChoroplethController, GeoFeature, ProjectionScale, ColorScale } from 'chartjs-chart-geo'; // Import ColorScale
import * as topojson from 'topojson';
// import { countries } from './countries';
import { countries } from './datajson';
import { code } from './Code_ISO';
// import { listOfCountries } from './listOfCountries';

import ThreatenedSpeciesPie from './ThreatenedSpeciesPie'
Chart.register(...registerables, ChoroplethController, GeoFeature, ProjectionScale, ColorScale); // Register ColorScale

const ExtinctSpeciesMap = () => {
  const chartRef = useRef(null);
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [countryData, setCountryData] = useState([]);
  const ref = useRef([])

  useEffect(() => {

    const countryTExt = Object.fromEntries(
      countries
        .map(item => {
          const countryCode = code[item.Name];
          // console.log(`Mapping: ${item.Name} -> ${countryCode}, Total: ${item.Total}`);
          return [countryCode, item.Total];
        })
        .filter(([key]) => key)
    );
    const countryData = Object.fromEntries(
      countries
        .map(item => {
          const countryCode = code[item.Name];
          return [countryCode,item.Name, item.Total];
        })
        .filter(([key]) => key)
    );
    setCountryData(countryTExt, "+++++++++++");
    const tester = (d) => ref.current.includes(d.properties.name)
    fetch('https://unpkg.com/world-atlas/countries-50m.json')
      .then((response) => response.json())
      .then((data) => {

        const countries = topojson.feature(data, data.objects.countries).features;


        const ctx = chartRef.current.getContext('2d');
        const newChart = new Chart(ctx, {
          type: 'choropleth',
          data: {
            labels: countries.map((d) => d.properties.name),
            datasets: [{
              label: 'Extinct Species Count',
              data: countries.map((d) => {

                const countryCode = d.id;
                // console.log(d, countryTExt[countryCode], countryCode,);
                console.log(d.properties.name, "+++++__++++")
                return {
                  feature: d,
                  value: countryTExt[countryCode] || 0,
                  borderColor: ref.current.includes(d.properties.name) ? 'darkred' : 'lightgray', // Darker border for selected countries
                  borderWidth: ref.current.includes(d.properties.name) ? 2 : 1,
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
            },
            onClick: (event, elements) => {
              if (elements.length > 0) {
                const datasetIndex = elements[0].datasetIndex;
                const dataIndex = elements[0].index;

                // const
                // Access the clicked data point
                const clickedData = newChart.data.datasets[datasetIndex].data[dataIndex];

                // Do something with the clicked data
                console.log("Clicked data:", clickedData);
                const countryName = clickedData.feature.properties.name;
                if (ref.current.includes(countryName)) {
                  const temp = ref.current.filter(item => item !== countryName)
                  console.log(temp);
                  ref.current = temp;
                  setSelectedCountries(JSON.parse(JSON.stringify(temp)));
                } else {
                  selectedCountries.push(countryName)
                  ref.current.push(countryName)
                  setSelectedCountries(JSON.parse(JSON.stringify(selectedCountries)));
                }
                // console.log(ref.current);

              }
            }
          }
        });
      })
      .catch((error) => {
        console.error('Error fetching or processing TopoJSON data:', error);
      });
  }, [ref.current]);



  return (
    <div>
      <h1 style={{ color: "black" }}>List of threatened species per countries</h1>
      <canvas ref={chartRef} width="800" height="600"></canvas>
      <h2 style={{ color: "black" }}>Pie charts for selected countries:</h2>
      <div style={{ marginTop: '20px', color: "black", display: 'flex', flexWrap: 'wrap' }}>
        {ref.current.map((country, index) => {
          const countryInfo = countries.filter(item => item.Name === country)[0];
          console.log(country, "--------") // Get the data for the selected country
          return (
            <div style={{ width: '200', height: '200' }} key={index}>
              <div>{country}</div>
              <ThreatenedSpeciesPie
                data={countryInfo}  // Pass the specific country's data for the pie chart
                selected={ref.current}
                label={index === 0 ? true : false} // Only show the label for the first chart
              />
            </div>
          );
        })}
      </div>
    </div >
  );
};

export default ExtinctSpeciesMap;



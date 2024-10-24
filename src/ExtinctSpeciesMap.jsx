import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import { ChoroplethController, GeoFeature, ProjectionScale, ColorScale } from 'chartjs-chart-geo'; // Import ColorScale
import * as topojson from 'topojson';
// import { countries } from './countries';
import { countries } from './datajson';
import { code } from './Code_ISO';
import { listOfCountries } from './listOfCountries';
Chart.register(...registerables, ChoroplethController, GeoFeature, ProjectionScale, ColorScale); // Register ColorScale

const ExtinctSpeciesMap = () => {
  const chartRef = useRef(null);
  const [countryCodes, setCountryCodes] = useState([]);
  const [countryData, setCountryData] = useState([]);

  // useEffect(() => {
  //   // const x = countries.map(country => country.code);
  //   // console.log(x, "--------------00");
  //   const codeArray = Object.fromEntries(code.map(item => [item.name, item["country-code"]]));
  //   console.log(codeArray, "dgfuydgs")
  //   // setCountryCodes(listOfCountries);
  //   const countryTExt = Object.fromEntries(countries.map(item => [codeArray[item.Country], item.T_EX + item.A_EX + item.M_EX]));
  //   setCountryData(countryTExt);
  //   console.log(countryTExt, "-------")
  //   // listOfCountries.map((item) => {

  //   // })
  // }, []);

  useEffect(() => {
    // // Example data for extinct species (can be fetched dynamically)
    // const extinctSpeciesData = {
    //   USA: 0,
    //   BRA: 200,
    //   IND: 300,
    //   // Add more countries...
    // };
    // const codeArray = Object.fromEntries(code.map(item => [item.name, item["country-code"]]));
    // console.log(codeArray, "dgfuydgs")
    // setCountryCodes(listOfCountries);
    // const countryTExt = Object.fromEntries(countries.map(item => [codeArray[item["Name"]], item.Total]));
    const countryTExt = Object.fromEntries(
      countries
        .map(item => {
          const countryCode = code[item.Name];
          console.log(Mapping: ${item.Name} -> ${countryCode}, Total: ${item.Total});
          return [countryCode, item.Total]; // match country names to country codes
        })
        .filter(([key]) => key) // filter out entries where country code is undefined
    );
    setCountryData(countryTExt, "+++++++++++");
    // Fetch TopoJSON world data
    fetch('https://unpkg.com/world-atlas/countries-50m.json')
      .then((response) => response.json())
      .then((data) => {
        // Convert TopoJSON to GeoJSON features using ChartGeo.topojson
        const countries = topojson.feature(data, data.objects.countries).features;

        // Create the Choropleth chart
        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
          type: 'choropleth',
          data: {
            labels: countries.map((d) => d.properties.name),
            datasets: [{
              label: 'Extinct Species Count',
              data: countries.map((d) => {
                // console.log(d);
                const countryCode = d.id;
                console.log(d, countryTExt[countryCode], countryCode,);

                return {
                  feature: d,
                  value: countryTExt[countryCode] || 0// Random or actual values
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
              color: {  // Now color scale is registered
                axis: 'y',
                quantize: 40,
                interpolate: "magma",
                // range: ['#d8e7f9', '#87bfff', '#1c75bc', '#0a4d7e', '#002c51']
              }
            },
            plugins: {
              legend: {
                display: false // Customize legend if needed
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
      <canvas ref={chartRef} width="800" height="600"></canvas>
    </div>
  );
};

export default ExtinctSpeciesMap;


// const codeArray = Object.fromEntries(code.map(item => [item["alpha-3"], item["country-code"]]));
// console.log(codeArray, "dgfuydgs")
// // setCountryCodes(listOfCountries);
// const countryTExt = Object.fromEntries(countries.map(item => [codeArray[item.CC], item.T_EX + item.A_EX + item.M_EX]));
// setCountryData(countryTExt);
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
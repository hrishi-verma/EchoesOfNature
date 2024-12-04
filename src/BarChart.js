import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { rate } from './ExtinctionRateData'; // SDG data for rate of extinction
import { countries } from './datajson'; // Threatened species data

const BarChart = ({ selectedCountries, selectedCategory }) => {
  const svgRef = useRef();
  const tooltipRef = useRef();

  useEffect(() => {
    if (!selectedCountries || !selectedCategory) return;
    if (selectedCountries.length > 0) {
      const processedData = selectedCountries.map((countryName) => {
        const countryRate = rate.find((item) => item.GeoAreaName === countryName)?.["2024"] || 1;
        const countryThreats = countries.find((item) => item.Name === countryName) || {};
        const speciesCount =
          selectedCategory === "All Species"
            ? countryThreats.Total || 0
            : countryThreats[selectedCategory] || 0;

        const extinctionValue = Math.ceil((1 - countryRate) * speciesCount);

        return { country: countryName, value: extinctionValue };
      });

      const sortedData = processedData.filter((item) => item.country !== null).sort((a, b) => b.value - a.value);

      const svg = d3.select(svgRef.current);
      const tooltip = d3.select(tooltipRef.current);
      const width = 700;
      const height = 400;
      const margin = { top: 20, right: 30, bottom: 100, left: 50 };

      svg.attr("width", width).attr("height", height);
      svg.selectAll("*").remove();

      const xScale = d3
        .scaleBand()
        .domain(sortedData.map((d) => d.country))
        .range([margin.left, width - margin.right])
        .padding(0.2);

      const yScale = d3
        .scaleLinear()
        .domain([0, d3.max(sortedData, (d) => d.value) || 0])
        .range([height - margin.bottom, margin.top]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale).ticks(5).tickFormat(d3.format("d"));

      svg
        .append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(xAxis)
        .selectAll("text")
        .attr("transform", "rotate(-45)")
        .style("text-anchor", "end")
        .style("font-size", "10px")
        .on("mouseover", (event, d) => {
          const countryData = sortedData.find((item) => item.country === d);
          tooltip
            .style("visibility", "visible")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`)
            .text(`${d}: ${countryData ? countryData.value : 0}`);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`);
        })
        .on("mouseout", () => {
          tooltip.style("visibility", "hidden");
        });

      svg
        .append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(yAxis);

      svg
        .selectAll(".bar")
        .data(sortedData)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => xScale(d.country))
        .attr("y", (d) => yScale(d.value))
        .attr("width", xScale.bandwidth())
        .attr("height", (d) => height - margin.bottom - yScale(d.value))
        .attr("fill", "#aa6f73")
        .on("mouseover", (event, d) => {
          d3.select(event.currentTarget).attr("fill", "#66545e");
          tooltip
            .style("visibility", "visible")
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`)
            .text(`${d.country}: ${d.value}`);
        })
        .on("mousemove", (event) => {
          tooltip
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 20}px`);
        })
        .on("mouseout", (event) => {
          d3.select(event.currentTarget).attr("fill", "#aa6f73");
          tooltip.style("visibility", "hidden");
        });
    }
  }, [selectedCountries, selectedCategory]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <div
        ref={tooltipRef}
        style={{
          position: "absolute",
          visibility: "hidden",
          backgroundColor: "white",
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "5px",
          fontSize: "12px",
          pointerEvents: "none",
        }}
      ></div>
    </div>
  );
};

export default BarChart;
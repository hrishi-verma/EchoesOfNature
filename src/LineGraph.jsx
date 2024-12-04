import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { rate } from './ExtinctionRateData';

const LineGraph = ({ selectedCountries }) => {
    const [data, setData] = useState([]);
    const [svgWidth, setSvgWidth] = useState(600);
    const [svgHeight, setSvgHeight] = useState(400);

    // Prepare data from the imported rate JSON
    useEffect(() => {
        const formattedData = rate.map(item => ({
            GeoAreaCode: item.GeoAreaCode,
            GeoAreaName: item.GeoAreaName,
            years: Object.keys(item)
                .filter(key => key !== 'GeoAreaCode' && key !== 'GeoAreaName')
                .map(year => ({
                    year: year,
                    value: 1 - item[year], // Calculate 1 - value for each year
                }))
        }));
        setData(formattedData);
    }, []);

    useEffect(() => {
        if (selectedCountries.length > 0 && data.length > 0) {
            // Filter data based on selected countries (either by GeoAreaName or GeoAreaCode)
            const filteredData = data.filter(item =>
                selectedCountries.includes(item.GeoAreaName)
            );

            if (filteredData.length > 0) {
                const svg = d3.select('#lineGraph');
                svg.selectAll('*').remove();

                const margin = { top: 20, right: 20, bottom: 100, left: 50 };
                const width = svgWidth - margin.left - margin.right;
                const height = svgHeight - margin.top - margin.bottom;

                const xScale = d3.scaleLinear()
                    .domain([2000, 2024])
                    .range([0, width]);

                const yDomain = [
                    d3.min(filteredData, item => d3.min(item.years, d => d.value)),
                    d3.max(filteredData, item => d3.max(item.years, d => d.value))
                ];

                const yScale = d3.scaleLinear()
                    .domain([yDomain[0] - 0.05, yDomain[1] + 0.05])
                    .range([height, 0]);

                const line = d3.line()
                    .x(d => xScale(d.year))
                    .y(d => yScale(d.value));

                // Add axis
                svg.append('g')
                    .attr('transform', `translate(${margin.left},${height + margin.top})`)
                    .call(d3.axisBottom(xScale)
                        .ticks(10)
                        .tickFormat(d3.format("d")));

                svg.append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`)
                    .call(d3.axisLeft(yScale));

                // Draw the lines
                const lineGroup = svg.append('g')
                    .attr('transform', `translate(${margin.left},${margin.top})`);

                filteredData.forEach((item, index) => {
                    lineGroup.append('path')
                        .data([item.years])
                        .attr('class', 'line')
                        .attr('d', line)
                        .attr('fill', 'none')
                        .style('stroke', d3.schemeCategory10[index % 10])
                        .style('stroke-width', 1.5);
                });


                const tooltip = d3.select('#tooltip')
                    .style('opacity', 0)
                    .style('position', 'absolute')
                    .style('text-align', 'center')
                    .style('background', 'white')  // Set background to white
                    .style('border', '1px solid #333')
                    .style('border-radius', '8px')
                    .style('padding', '5px')
                    .style('font-size', '12px')
                    .style('color', 'black'); // Default text color

                // Append the vertical line to the SVG
                const verticalLine = svg.append('line')
                    .style('stroke', 'gray')
                    .style('stroke-width', 1)
                    .style('stroke-dasharray', '5,5') // Dashed line style
                    .style('opacity', 0); // Initially invisible

                svg.on('mousemove', function (event) {
                    const [x] = d3.pointer(event);
                    const year = xScale.invert(x - margin.left);
                    if (year) {
                        const yearStr = Math.round(year).toString();
                        const yearData = filteredData.map(item => {
                            const yearValue = item.years.find(d => d.year === yearStr);
                            return yearValue ? { name: item.GeoAreaName, value: yearValue.value, color: d3.schemeCategory10[filteredData.indexOf(item) % 10] } : null;
                        }).filter(Boolean);

                        // Check if yearData is not empty before accessing the color
                        if (yearData.length > 0) {
                            // Update the vertical line and tooltip
                            verticalLine
                                .style('opacity', 1)
                                .attr('x1', xScale(yearStr) + margin.left)
                                .attr('x2', xScale(yearStr) + margin.left)
                                .attr('y1', margin.top)
                                .attr('y2', height + margin.top);

                            // Set the tooltip's content and style
                            tooltip
                                .style('opacity', 1)
                                .html(
                                    yearStr +
                                    '<br>' +
                                    yearData
                                        .sort((a, b) => b.value - a.value) // Sort by value in descending order
                                        .map(d => {
                                            // Set each country's text color to match the line's color
                                            return `<span style="color:${d.color}">${d.name}: ${d.value.toFixed(4)}</span>`;
                                        })
                                        .join('<br>')
                                )
                                .style('left', `${event.pageX + 40}px`) // Adjusted position to move 10px right
                                .style('top', `${event.pageY - 28}px`);
                        }
                    }
                });

                svg.on('mouseleave', () => {
                    tooltip.style('opacity', 0); // Hide tooltip on mouse leave
                    verticalLine.style('opacity', 0); // Hide vertical line on mouse leave
                });



            }
        }
    }, [selectedCountries, data]);

    return (
        <div>
            {/* <h2>Extinction Rate Over Time</h2> */}
            <svg id="lineGraph" width={svgWidth} height={svgHeight}></svg>
            <div id="tooltip"></div>
        </div>
    );
};

export default LineGraph;

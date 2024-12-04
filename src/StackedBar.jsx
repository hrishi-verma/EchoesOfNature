import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { countries } from "./datajson"; // Import the dataset

const StackedBarChart = ({ selectedCountryNames }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const categories = [
            "Mammals",
            "Birds",
            "Reptiles",
            "Amphibians",
            "Fishes",
            "Molluscs",
            "Other Inverts",
            "Plants",
            "Fungi",
            "Chromists",
        ];

        const colorScheme = [
            '#FF6384', // Mammals
            '#36A2EB', // Birds
            '#FFCE56', // Reptiles
            '#4BC0C0', // Amphibians
            '#9966FF', // Fishes
            '#FF9F40', // Molluscs
            '#E7E9ED', // Other Inverts
            '#7CFC00', // Plants
            '#800000', // Fungi
            '#1E90FF', // Chromists
        ];




        // Filter the countries based on selected names
        const selectedCountriesFiltered = countries.filter((country) =>
            selectedCountryNames.includes(country.Name)
        );
        const selectedCountries = selectedCountriesFiltered.sort((a, b) => Number(b.Total) - Number(a.Total));

        if (!selectedCountries.length) return; // Prevent rendering if no countries are selected

        // Prepare labels and datasets for Chart.js
        const labels = selectedCountries.map((country) => country.Name);
        // Prepare datasets
        const datasets = categories.map((category, idx) => ({
            label: category,
            data: selectedCountries.map((country) => country[category]),
            backgroundColor: colorScheme[idx], // Use predefined color
        }));
        // Destroy previous chart instance if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Initialize a new chart
        const ctx = chartRef.current.getContext("2d");
        chartInstanceRef.current = new Chart(ctx, {
            type: "bar",
            data: {
                labels,
                datasets,
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "top",
                    },
                    title: {
                        display: true,
                        text: "Threatened Species by Category",
                    },
                },
                scales: {
                    x: {
                        stacked: true,
                    },
                    y: {
                        stacked: true,
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: "Number of Species",
                        },
                    },
                },
            },
        });
    }, [selectedCountryNames]);

    return (
        <canvas ref={chartRef} style={{  width: "100%"}}></canvas>
    )

    
};

export default StackedBarChart;

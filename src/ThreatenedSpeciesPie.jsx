import React, { useEffect, useRef } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data, selected, label }) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        const categories = [
            'Mammals',
            'Birds',
            'Reptiles',
            'Amphibians',
            'Fishes',
            'Molluscs',
            'Other Inverts',
            'Plants',
            'Fungi',
            'Chromists',
        ];


        const categoryData = categories.map((category) => {
            // console.log(data, category, data[category], "+++")
            return data?.[category]
        }

        )

        const ctx = chartRef.current.getContext('2d');

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: categories,
                datasets: [
                    {
                        label: 'Count',
                        data: categoryData,
                        backgroundColor: [
                            '#FF6384',
                            '#36A2EB',
                            '#FFCE56',
                            '#4BC0C0',
                            '#9966FF',
                            '#FF9F40',
                            '#E7E9ED',
                            '#7CFC00',
                            '#800000',
                            '#1E90FF',
                        ],
                        borderColor: '#ffffff',
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                responsive: true, // Keeps responsiveness
                maintainAspectRatio: false, // Allows manual resizing
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 15,
                            padding: 10,
                        },
                    },
                },
            },
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data, selected]);

    return (
        <div style={{ width: '300px', height: '300px', margin: '20px auto' }}>
            {/* {label && <h3 style={{ textAlign: 'center' }}>{label}</h3>} Custom Label */}
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

export default PieChart;

    //   // Add graticules (before countries)
    //   const graticule = d3.geoGraticule();

    //   svg.append('path')
    //     .datum(graticule)
    //     .attr('fill', 'none')
    //     .attr('stroke', '#ccc')
    //     .attr('stroke-width', 0.5)
    //     .attr('d', path);
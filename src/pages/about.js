import React from 'react';

const About = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>About Us</h1>

            {/* Introduction */}
            <p style={styles.paragraph}>
                This page presents an interactive visual tool that showcases summary statistics related to animal species assessed by the International Union for Conservation of Nature (IUCN), specifically focusing on endangered and extinct animals. These animals are categorized based on their risk of extinction, which can range from vulnerable species to those that are critically endangered or extinct. The visual tool aims to raise awareness about the status of these species and the importance of conservation efforts worldwide. The dataset was sourced from Table 6a, providing a comprehensive overview of animal species on the IUCN Red List. The tool includes various visualization components, starting with a map. By hovering over a country on the map, users can quickly access the number of species at risk of extinction or already extinct within that country. In addition to the map, the visual tool includes a pie chart that breaks down the distribution of endangered species by type. This allows users to gain a more detailed understanding of the diversity of animals at risk in any given country. The pie chart complements the map by providing a clear view of how species are categorized across different animal groups, making it easier to identify trends in wildlife conservation efforts.
            </p>

            {/* Goal */}
            <h1 style={styles.heading}>Our Goal</h1>
            <p style={styles.paragraph}>
                The primary goal of this project is to approximate the number of species at risk
                of extinction as of 2024 in each country. By shedding light on these trends,
                we aim to equip decision-makers with actionable insights to protect biodiversity.
            </p>

            {/* Datasets */}
            <h1 style={styles.heading}>Datasets</h1>
            <p style={styles.paragraph}>
                We utilized two critical datasets for this analysis:
            </p>
            <ul style={styles.list}>
                <li>
                    <a href="https://www.iucnredlist.org/statistics" target="_blank" rel="noopener noreferrer" style={styles.link}>
                        IUCN Red List: Threatened Species per Country Table 5a
                    </a>
                </li>
                <li>
                    <a href="https://unstats.un.org/sdgs/metadata/files/Metadata-15-05-01.pdf" target="_blank" rel="noopener noreferrer" style={styles.link}>
                        United Nations SDG Indicator 15.5.1: Proportion of Threatened Species
                    </a>
                </li>
            </ul>
            <p style={styles.paragraph}>
                These datasets serve as the foundation for estimating trends and identifying countries
                with significant threats to biodiversity.
            </p>

            {/* Visualizations */}
            <h1 style={styles.heading}>Visualizations</h1>
            <p style={styles.paragraph}>
                Our platform offers a comprehensive visual exploration of species data:
            </p>
            <ul style={styles.list}>
                <li>
                    <strong>Map Chart:</strong> The map visualization offers a global overview of countries with respect to their endangered species. As users hover over any country, the map displays a number that represents the species within that region that are threatened or extinct. The map utilizes a heatmap design, where the intensity of color corresponds to the density of at-risk species. Countries with darker shades indicate higher numbers of endangered or extinct species, highlighting the urgent need for conservation efforts in those regions. This visualization serves as a powerful tool to understand the global distribution of species at risk and helps users easily identify areas where attention is needed most in preserving biodiversity.
                </li>
                <li>
                    <strong>Line Chart:</strong> The line chart provides a detailed view of the historical extinction rates of species over time. When users click on any country in the map, the chart dynamically updates to show the extinction rate for that specific country, allowing for an in-depth look at how extinction trends have evolved. Users can also select multiple countries at once to compare the extinction rates across different regions. The chart displays data up until 2024, offering a clear understanding of the changes in extinction rates over the years. This visualization is an essential tool for identifying patterns and trends, helping to guide conservation efforts by focusing on regions with the highest rates of extinction.
                </li>
                <li>
                    <strong>Bar Chart:</strong> The bar graph visualizes the extinction rates of species over time, helping users understand the trends in species extinction and the critical need for conservation action. When users click on any country on the map, the bar graph updates to predict the number of species that could go extinct by 2024 for that country.
                    <br />
                    Below is the formula used for predicting species extinction:
                    <br />
                    <strong style={styles.code}>
                        (Rate of Country) × (Number of Threatened Species)
                    </strong>
                    <br />
                    The rate is a value between 0 and 1, derived from historical extinction data. Additionally, users can select multiple countries at once, allowing for easy comparison of predicted extinction rates across regions. This feature provides a powerful tool to identify areas where species are at the highest risk of extinction, guiding future conservation priorities.
                </li>
                <li>
                    <strong>Pie Charts:</strong> The pie chart visualization provides a detailed breakdown of the different types of animal species at risk in a selected country. When a user clicks on a country, the pie chart appears below the map, illustrating the proportion of species categorized by type, such as mammals, birds, reptiles, amphibians, and fish. This chart helps users understand the diversity of species that are endangered or extinct within that country, offering a clear visual representation of the distribution of these species. It complements the map by allowing for a deeper dive into the specifics of species composition in each region.
                </li>
            </ul>

            {/* Closing Statement */}
            <p style={styles.paragraph}>
                Through these tools, we aim to make data on species extinction accessible and actionable for everyone.
                If you have any questions or suggestions, feel free to reach out to us. Together, we can make a difference!
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '60%',
        margin: '50px auto',
        padding: '20px',
        textAlign: 'left',
        lineHeight: '1.6',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '20px',
    },
    subheading: {
        fontSize: '1.8em',
        color: '#444',
        marginTop: '30px',
        marginBottom: '10px',
    },
    paragraph: {
        fontSize: '1.2em',
        color: '#555',
        margin: '10px 0',
    },
    list: {
        fontSize: '1.2em',
        color: '#555',
        margin: '10px 0',
        paddingLeft: '20px',
        lineHeight: '1.8',
    },
    link: {
        color: '#007BFF',
        textDecoration: 'none',
    },
    code: {
        display: 'inline-block',
        backgroundColor: '#f5f5f5',
        padding: '2px 6px',
        borderRadius: '4px',
        fontFamily: 'monospace',
    },
};

export default About;

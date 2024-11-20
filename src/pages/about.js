import React from 'react';

const About = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>About Us</h1>

            {/* Introduction */}
            <p style={styles.paragraph}>
                Welcome to our project dedicated to raising awareness about species extinction.
                Our work aims to highlight threatened species worldwide and predict extinction trends.
            </p>

            {/* Goal */}
            <h2 style={styles.subheading}>Our Goal</h2>
            <p style={styles.paragraph}>
                The primary goal of this project is to approximate the number of species at risk
                of extinction as of 2024 in each country. By shedding light on these trends,
                we aim to equip decision-makers with actionable insights to protect biodiversity.
            </p>

            {/* Datasets */}
            <h2 style={styles.subheading}>Datasets</h2>
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
            <h2 style={styles.subheading}>Visualizations</h2>
            <p style={styles.paragraph}>
                Our platform offers a comprehensive visual exploration of species data:
            </p>
            <ul style={styles.list}>
                <li>
                    Map Chart: Displays the number of threatened species per category for each country.
                    Clicking on a country reveals further insights.
                </li>
                <li>
                    Line Chart: Illustrates the historical trend of threatened species for the selected country.
                </li>
                <li>
                    Bar Chart: Predicts species extinction based on the formula:
                    <br />
                    <code style={styles.code}>
                        (Rate of Country) × (Number of Threatened Species)
                    </code>
                    <br />
                    Here, the rate is a value between 0 and 1 derived from historical data.
                </li>
                <li>
                    Pie Charts: Provide a breakdown of species categories in the selected country for a deeper understanding.
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
        maxWidth: '800px',
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

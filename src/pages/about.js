
import React from 'react';

const About = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.heading}>About Us</h1>
            <p style={styles.paragraph}>
                Thank you for joining us on this journey. If you have any questions 
                or suggestions, feel free to reach out to us. We’re excited to grow 
                and innovate with you!
            </p>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: '800px',
        margin: '50px auto',
        padding: '20px',
        textAlign: 'center',
        lineHeight: '1.6',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    heading: {
        fontSize: '2.5em',
        color: '#333',
        marginBottom: '20px',
    },
    paragraph: {
        fontSize: '1.2em',
        color: '#555',
        margin: '10px 0',
    },
};

export default About;


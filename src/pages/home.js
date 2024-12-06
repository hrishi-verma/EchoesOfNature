import React from 'react';
import ExtinctSpeciesMap from '../ExtinctSpeciesMap';
import ExtinctSpeciesMapD3 from '../ExtinctSpeciesMapD3';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>

            <div className="App">
                <header className="App-header">
                    <div style={{ color: 'black', width: "100%" }}>
                        <h2>Welcome to the Extinct Animal Tracker</h2>
                        <p>
                            Explore the data visualizations of threatened species around the world and prediction of their extinction.
                        </p>
                        <p>
                            <a href="https://youtu.be/gNzeNfg4YIE" target="_blank" rel="noopener noreferrer">
                                Watch the YouTube Video of our screencast.
                            </a>
                        </p>
                        {/* <ExtinctSpeciesMap /> */}
                        <ExtinctSpeciesMapD3 />
                    </div>
                </header>
            </div>
        </div>
    );
};

export default Home;


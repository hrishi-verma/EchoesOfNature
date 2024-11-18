import React from 'react';
import ExtinctSpeciesMap from '../ExtinctSpeciesMap';
import ExtinctSpeciesMapD3 from '../ExtinctSpeciesMapD3';

const Home = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>

            <div className="App">
                <header className="App-header">
                    <div style={{ color: 'black' }}>
                        <h1>Welcome to the Extinct Species App</h1>
                        <p>
                            Explore the data visualizations of extinct and threatened species around the world.
                        </p>
                        <p>
                            Use the navigation bar to explore the map, learn more about the project, or check out the interactions.
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


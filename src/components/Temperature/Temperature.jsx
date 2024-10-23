import React, { useState, useEffect } from 'react';
import './Temperature.css';
import Variable from '../Variable/Variable';

function Temperature({ name, Celsius }) {
    const [celsius, setCelsius] = useState(0);
    const [fahrenheit, setFahrenheit] = useState(0);
    const [kelvin, setKelvin] = useState(0);

    useEffect(() => {
        setCelsius(Celsius || 0);
    }, [Celsius]);

    useEffect(() => {
        setFahrenheit((celsius * 9/5) + 32);
        setKelvin(celsius + 273.15);
    }, [celsius]);

    const updateFahrenheit = (newFahrenheit) => {
        setFahrenheit(newFahrenheit);
        setCelsius((newFahrenheit - 32) * 5/9);
    };

    const updateKelvin = (newKelvin) => {
        setKelvin(newKelvin);
        setCelsius(newKelvin - 273.15);
    };

    return (
        <>
            <div className='tem-container'>
                <div>
                    <h2 style={{ textAlign: 'center' }}>{name}</h2>
                </div>
                <h4 className='tem-content'>
                    <span>{celsius.toFixed(2)}°C</span>
                    <span>{fahrenheit.toFixed(2)}°F</span>
                    <span>{kelvin.toFixed(2)}°K</span>
                </h4>
                <div className='tem-var'>
                    <Variable name={'Celsius'} value={celsius} setValue={setCelsius} />
                    <Variable name={'Fahrenheit'} value={fahrenheit} setValue={updateFahrenheit} />
                    <Variable name={'Kelvin'} value={kelvin} setValue={updateKelvin} />
                </div>
            </div>
        </>
    );
}

export default Temperature;

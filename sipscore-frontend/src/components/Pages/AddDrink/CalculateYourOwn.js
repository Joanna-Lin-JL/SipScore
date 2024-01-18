import React, { useState, useEffect } from "react";
import CircularButton from './components/addButton';

function InputDrink() {
    const [name, setName] = useState("");
    const [caffeine, setCaffiene] = useState("");
    const [seasonal, setSeasonal] = useState("");

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function handleCaffieneChange(event) {
        setCaffiene(event.target.value);
    }

    function handleSeasonalChange(event) {
        setChecked(!seasonal);
    }

    function handleClick(event) {
        event.preventDefault();
    }

    return (
        <div className="container">
            <form onSubmit={handleClick}>
                <h2>Input Name</h2>
                <input
                    onChange={handleNameChange}
                    type="text"
                    placeholder="Input Item Name"
                    value={name}
                />
                <h2>Input Mg of Caffeine</h2>
                <input
                    onChange={handleCaffieneChange}
                    type="text"
                    placeholder="Input Caffiene Amount"
                    value={caffiene}
                />
                <h2>Input Seasonal</h2>
                <label>
                    <input
                        onChange={handleSeasonalChange}
                        type="checkbox"
                        checked={checked}
                        value={seasonal}
                    />
                    Seasonal Check
                </label>
                <CircularButton type="submit" />
            </form>
        </div>
    );
}

export default InputDrink;
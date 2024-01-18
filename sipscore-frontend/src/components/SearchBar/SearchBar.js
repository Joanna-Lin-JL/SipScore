/* SearchBar.js */

import React, { useState, useEffect, useRef } from 'react';
import './SearchBar.css';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const searchContainerRef = useRef(null);

    // Replace with drinks from backend
    const countries = [
        { name: "Belgium" },
        { name: "India" },
        { name: "Bolivia" },
        { name: "Ghana" },
        { name: "Japan" },
        { name: "Canada" },
        { name: "Brazil" },
        { name: "Australia" },
        { name: "Italy" },
        { name: "Mexico" },
        { name: "South Korea" },
        { name: "Netherlands" },
    ];


    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);

        const filteredOptions = countries.filter((country) =>
            country.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredCountries(filteredOptions);
        setSelectedOption(null);
    };

    const handleOptionClick = (country) => {
        setSearchInput(country.name);
        setFilteredCountries([]);
        setSelectedOption(country);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const handleClickOutside = (e) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(e.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className="search-bar-container" ref={searchContainerRef}>
            <input
                type="text"
                placeholder="Item Name"
                value={searchInput}
                onChange={handleInputChange}
                onClick={toggleDropdown}
                className={`search-bar ${isDropdownOpen ? 'active' : ''}`}
            />
            {isDropdownOpen && filteredCountries.length > 0 && (
                <div className="dropdown">
                    {filteredCountries.map((country, index) => (
                        <div
                            key={index}
                            className="option"
                            onClick={() => handleOptionClick(country)}
                        >
                            {country.name}
                        </div>
                    ))}
                </div>
            )}
            {selectedOption && (
                <div>
                    Selected: {selectedOption.name}
                </div>
            )}
        </div>
    );
};

export default SearchBar;

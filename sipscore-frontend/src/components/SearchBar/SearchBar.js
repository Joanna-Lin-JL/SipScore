import React, { useState } from 'react'

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);

    const countries = [
        { name: "Belgium" },
        { name: "India" },
        { name: "Bolivia" },
        { name: "Ghana" },
        { name: "Japan" },
        { name: "Canada" },
    ];

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        setSearchInput(inputValue);

        const filteredOptions = countries.filter((country) =>
            country.name.toLowerCase().includes(inputValue.toLowerCase())
        );
        setFilteredCountries(filteredOptions);
    };

    const handleOptionClick = (countryName) => {
        setSearchInput(countryName);
        setFilteredCountries([]);
    };

    // const filteredCountries = countries.filter((country) => {
    //     return country.name.toLowerCase().includes(searchInput.toLowerCase());
    // })

    // if (searchInput.length > 0) {
    //     countries.filter((country) => {
    //         return country.name.match(searchInput);
    //     });
    // }

    return (
        <div>
            <input
                type="search"
                placeholder="Search"
                value={searchInput}
                onChange={handleInputChange}
            />
            {filteredCountries.length > 0 && (
                <table>
                    <tbody>
                        {filteredCountries.map((country, index) => (
                            <tr key={index} onClick={() => handleOptionClick(country.name)}>
                                <td>{country.name}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default SearchBar;
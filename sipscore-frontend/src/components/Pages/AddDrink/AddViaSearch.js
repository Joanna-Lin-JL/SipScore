import React, { useState, useEffect } from "react";
import Navigation from '../../NavigationBar/Navigation';
import Header from '../../Header/Header';
import SearchBar from '../../SearchBar/SearchBar';
import CircularButton from '../../CircularButton/addButton';

function AddViaSearch() {

    return (
        <div className="add-via-search-container">
            <h2>Item Name</h2>
            <SearchBar />
            <h2>Additional Shots of Caffiene: </h2>
            <input type="number" placeholder="Extra Espresso Shots" name="shots" id="shots_text" />
            <CircularButton />
        </div>
    );
}

export default AddViaSearch;

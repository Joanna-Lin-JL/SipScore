import React, { useState, useEffect } from "react";
import Navigation from '../../NavigationBar/Navigation';
import Header from '../../Header/Header';
import SearchBar from '../../SearchBar/SearchBar';
import CircularButton from '../../CircularButton/addButton';
import './App.css';

function AddViaSearch() {


    return (
        <div className="add-via-search-container">
            <Header />
            <Navigation />
            <h2>Item Name</h2>
            <SearchBar />
            <CircularButton />
        </div>
    );
}

export default AddViaSearch;

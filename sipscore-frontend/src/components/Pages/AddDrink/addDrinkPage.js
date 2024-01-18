import banner from './photos/sip_score_banner.png';
import React, { useState, useEffect } from "react";
import Navigation from '../../NavigationBar/Navigation';
import Header from '../../Header/Header';
import SearchBar from '../../SearchBar/SearchBar';
import CircularButton from './components/addButton';
import User from './components/User/User';
import InputDrink from "./CalculateYourOwn"
import './App.css';

function AddDrink() {

    const [allDrinks, setAllDrinks] = useState([]);
    const [recentDrinks, setRecentDrinks] = useState({
        "name": "",
        "serving_size": 0,
        "picture": "",
        "caffeine_amt": 0,
        "seasonal": false,
        "location": ""
    });
    const [favDrinks, setFavDrinks] = useState({
        "name": "",
        "serving_size": 0,
        "picture": "",
        "caffeine_amt": 0,
        "seasonal": false,
        "location": ""
    });

    useEffect(() => {
        fetch("api/drinks").then((res) => {
            console.log(res);
        }
        );
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <Header />
                <Navigation></Navigation>
                <SearchBar />
                <CircularButton />
                <InputDrink />
                {/* <User /> */}
            </header>
        </div>
    );
}

export default AddDrink;

import banner from './photos/sip_score_banner.png';
import React, { useState, useEffect } from "react";
import Navigation from './components/NavigationBar/Navigation';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import CircularButton from './components/addButton';
import './App.css';

function App() {
    const [allDrinks, setAllDrinks] = useState([]);
    const [drinks, setDrinks] = useState({
        "name": "",
        "serving_size": 0,
        "picture": "",
        "caffeine_amt": 0,
        "seasonal": false,
        "location": ""
    })

    useEffect(() => {
        fetch("api/").then((res) => {
            console.log(res);
        }
        );
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <Header />
                <h1>SipScore</h1>
                <Navigation></Navigation>
                <SearchBar />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="photos/sip_score_banner.png"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Change test
                </a>
                <CircularButton />
            </header>
        </div>
    );
}

export default App;

import banner from './photos/sip_score_banner.png';
import React, { useState, useEffect } from "react";
import Navigation from './components/NavigationBar/Navigation';
import Header from './components/Header/Header';
import SearchBar from './components/SearchBar/SearchBar';
import CircularButton from './components/CircularButton/addButton';
import UserProfile from './components//Pages/UserProfile/User';
import Drink from "./drink"
import User from "./user"
import Login from './components/Pages/Login/Login'
import './App.css';
import AddViaSearch from './components/Pages/AddDrink/AddViaSearch';

function App() {

    const [allDrinks, setAllDrinks] = useState([]);
    const [recentDrinks, setRecentDrinks] = useState(new Drink(0, "", 0, "", 0, false, ""));
    const [favDrinks, setFavDrinks] = useState(new Drink(0, "", 0, "", 0, false, ""));
    const [users, setUsers] = useState(new User("", "", recentDrinks, favDrinks));

    async function getData(url = "") {
        const response = await fetch(url, {
            method: "GET",
            mode: "cors"
        });
        return response
    }

    async function postData(url = "", data = {}) {
        const response = await fetch(url, {
            method: "POST",
            mode: "cors",
            body: JSON.stringity(data)
        })
        return response.json()
    }

    useEffect(() => {
        // getData("https://thingproxy.freeboard.io/fetch/http://localhost:8000/api/drinks/").then((data) => {
        //     console.log(data);
        // });
        getData("api/").then((data) => {
            data.text().then((d) => console.log(d.data))
        })
        getData("api/drinks/").then((res) => {
            res.json().then((d) => {
                const data_drinks = d.data.drinks.map(function (data) {
                    return new Drink(data.drinkID, data.name, data.serving_size, data.picture, data.caffeine_amt, data.seasonal, data.location)
                })
                setAllDrinks(data_drinks);
            })
        });
        console.log(allDrinks);

        // fetch("http://localhost:8000/api/drinks/").then((res) => {
        //     // dissect json object into javscript object later
        //     console.log("fetched");
        //     console.log(res);
        // });
        // fetch("http://localhost:8000/api/drinks/").then((res) => {
        //     res.json().then((data) => {
        //         data.forEach((d) => {
        //             new_d = new Drink(d.drinkID, d.name, d.serviing_size, d.drink_picture, d.caffeine_amt, d.seasonal, d.location);
        //             setAllDrinks([...Drinks, new_id]);
        //         })
        //     })
        // });
    }, [])

    return (
        <div className="App">
            <header className="App-header">
                <Header />
                <Navigation />
                <SearchBar drinks={allDrinks} />
                <CircularButton />
                <Login />
                {/* <AddViaSearch /> */}
                {/* <UserProfile /> */}
                {/* <SearchDrop /> */}
                {/* <User 
                    profile_pic = users.profile_pic
                    username = users.username
                    recentDrinks = users.recentDrinks
                    favDrinks = users.favDrinks
                /> */}
            </header>
        </div>
    );
}

export default App;

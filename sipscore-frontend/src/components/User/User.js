import React from 'react';
import Drinks from '../UserDrinks/Drinks';

function User(props) {
    return (
        <div className='profile'>
            <span className='desc'><img className='profilePic' src={props.profile_pic} />{props.username}</span>
            <h2>Recent Consumptions</h2>
            <Drinks
                picture={props.recentDrinks.picture}
                name={props.recentDrinks.name}
                caffeine_amt={props.recentDrinks.caffeine_amt}
            />
            <h2>Favorite Drinks</h2>
            <Drinks
                picture={props.favDrinks.picture}
                name={props.favDrinks.name}
                caffeine_amt={props.favDrinks.caffeine_amt}
            />
        </div>
    );
}

export default User;
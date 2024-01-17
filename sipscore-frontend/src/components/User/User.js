import React from 'react';
import Drinks from '../UserDrinks/Drinks';

function User(props) {
    return (
        <div className='profile'>
            <span className='desc'><img className='profilePic' src={props.profile_pic} />{props.username}</span>
            <h2>Recent Consumptions</h2>
            <Drinks
                key={emojiTerm.id}
                emoji={emojiTerm.emoji}
                name={emojiTerm.name}
                desc={emojiTerm.meaning}
            />
            <h2>Favorite Drinks</h2>
            <Drinks />
        </div>
    );
}

export default User;
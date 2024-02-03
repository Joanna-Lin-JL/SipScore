import React from 'react';
import Drinks from '../../UserDrinks/Drinks';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function UserProfile({ props }) {
    return (
        <div className='profile'>
            <span className='desc'><img className='profilePic' src={props.profile_pic} />{props.username}</span>
            <h2>Recent Consumptions</h2>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Drinks
                    picture={props.recentDrinks.picture}
                    name={props.recentDrinks.name}
                    caffeine_amt={props.recentDrinks.caffeine_amt}
                />
            </Grid>
            <h2>Favorite Drinks</h2>
            <Grid sx={{ flexGrow: 1 }} container spacing={2}>
                <Drinks
                    picture={props.favDrinks.picture}
                    name={props.favDrinks.name}
                    caffeine_amt={props.favDrinks.caffeine_amt}
                />
            </Grid>
        </div>
    );
}

export default UserProfile;
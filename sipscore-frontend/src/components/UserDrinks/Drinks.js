import React from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';


function Drinks(props) {
    return (
        <Grid item xs={12}>
            <Grid spacing={1}>
                <Grid item>
                    <Card style={{ width: '18rem' }}>
                        <Card.Img variant="top" src={props.picture} />
                        <Card.Body>
                            <Card.Title>{props.name}</Card.Title>
                            <Card.Text>
                                {props.caffeine_amt}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default Drinks;
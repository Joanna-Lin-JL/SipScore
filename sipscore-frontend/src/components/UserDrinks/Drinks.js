import React from 'react';
import Card from '@mui/material/Card';


function Drinks(props) {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={props.picture} />
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>
                    {props.caffeine_amt}
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default Drinks;
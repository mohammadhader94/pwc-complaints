import React from 'react';
import {Link} from 'react-router-dom';
import {Typography, Paper} from "@material-ui/core";

const NotFound = () => (

    <Paper elevation={3}>
        <Typography variant="h1" align="center">
            404
        </Typography>
        <Typography variant="h3" align="center">
            page not found
        </Typography>
        <Typography variant="h3" align="center">
            <Link to="/">
                Go Home
            </Link>
        </Typography>

    </Paper>

);

export default NotFound;
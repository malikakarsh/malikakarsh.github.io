import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    footer: {
        backgroundColor: 'white',
        padding: theme.spacing(2)
    }
}));
const Footer = () => {
    const classes = useStyles();
    return (<Box component='div' className={classes.footer}>
                    <h1>Made with <i class="fas fa-heart"></i> by Akarsh</h1>
                    <p><i class="far fa-copyright"></i> All Rights Reserved | 2021</p>
                </Box>)
}
export default Footer;
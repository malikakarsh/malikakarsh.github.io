import React from 'react';
import Box from '@material-ui/core/Box';
import useStyles from './Style';

const Footer = () => {
    const classes = useStyles();
    return (<Box component='div' className={classes.footer}>
                    <h1>Made with <i class="fas fa-heart"></i> By Akarsh</h1>
                    <p><i class="far fa-copyright"></i> All Rights Reserved | 2023</p>
                </Box>)
}
export default Footer;
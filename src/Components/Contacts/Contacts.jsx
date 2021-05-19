import React from 'react';
import emailjs from 'emailjs-com';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Zoom from 'react-reveal/Zoom';




const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        overflowX: 'hidden',
    },
    inp: {
        fontSize: '20px',
        color: 'white',
        outline: 'none',
        backgroundColor: 'rgb(1, 41, 59)',
        border: 'none',
        width: '90%',
        borderBottom: '1px solid black',
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(4),
        marginBottom: theme.spacing(2),
        marginTop: theme.spacing(2),
        [theme.breakpoints.down('xs')]: {
            width: '80%'
        }
    },
    container: {
        paddingTop: '15%'
    },
    title: {
        justifyContent: 'center',
        textAlign: 'center',
        [theme.breakpoints.down('xs')]: {
            textAlign: 'left',
        }
    },
    header2: {
        paddingLeft: theme.spacing(2),
        color: 'white',
        fontFamily: 'Poiret One',
        fontSize: '2rem',
        '@media (min-width:600px)': {
            fontSize: '2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.7rem',
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(0),
            paddingTop: theme.spacing(5)
        },
    },
    buttons: {
        cursor: 'pointer',
        border: 'none',
        backgroundColor: 'rgb(241, 124, 28)',
        color: 'white',
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: theme.spacing(2),
        borderRadius: '0',
        paddingLeft: theme.spacing(6),
        paddingRight: theme.spacing(6),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        '&:hover': {
            backgroundColor: 'orange'
        }
    },
    grid: {
        padding: theme.spacing(1),
    },
    footer: {
        flexGrow: 1,
        fontSize: '0.9rem',
        marginTop: '0vh',
        padding: theme.spacing(2),
        paddingLeft: theme.spacing(4),
        color: 'dark-grey',
        height: '12vh',
        bottom: '0px',
        backgroundColor: 'white',
        width: '100%',
        [theme.breakpoints.down('lg')]: {
            marginTop: '11%',
        },
        [theme.breakpoints.down('md')]: {
            marginTop: '10%',
            fontSize: '0.8rem',
        },
        [theme.breakpoints.down('sm')]: {
            marginTop: '10%',
        },
        
        [theme.breakpoints.down('xs')]: {
            fontSize: '0.7rem',
            marginTop: '20%',
            height: '15vh',
        },
        
    }

}));

const Contact = () => {
    const classes = useStyles();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_ehxgumc', 'template_l58vwij', e.target, 'user_iQNW0sDjx5Hy9TWf9PEyD')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });

        e.target.reset();
    }

    return (<Box component="div" className={classes.root} id="contact">
                <Box>
                <Zoom>
                <Container className={classes.container}>
                    <form onSubmit={sendEmail}>
                        <Grid container spacing={3} className={classes.grid}>
                            <Grid item xs={12} md={5} className={classes.title}>
                                <h2 className={classes.header2}>Get In Touch</h2>
                            </Grid>
                            <Grid item xs={12} md={7} style={{backgroundColor: 'rgb(1, 41, 59)',paddingTop: '2%',paddingBottom: '2%',boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'}}>
                                <Grid item xs={12} className={classes.forms}>
                                    <input className={classes.inp} name='name' type="text" placeholder="Name" required></input>
                                </Grid>
                                <Grid item xs={12}>
                                    <input className={classes.inp} name='email' type="text" placeholder="Email" required></input>
                                </Grid>
                                <Grid item xs={12}>
                                    <input className={classes.inp} name='message' placeholder="Message" required></input>
                                </Grid>
                                <Grid item xs={12} style={{textAlign: 'left'}}>
                                    <input type='submit' value='SUBMIT' className={classes.buttons}></input>
                                </Grid>
                            </Grid>
                        </Grid>
                    </form>
                </Container>
                </Zoom>
                <Box component='div' className={classes.footer}>
                    <h1 style={{fontFamily: 'Poiret One'}}>Made with <span style={{color: 'red'}}><i class="fas fa-heart"></i></span> by Akarsh</h1>
                    <p><i class="far fa-copyright"></i> All Rights Reserved | 2021</p>
                </Box>
                </Box>
            </Box>)
}

export default Contact;
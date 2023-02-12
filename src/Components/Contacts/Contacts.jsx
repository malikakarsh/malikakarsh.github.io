import React from 'react';
import emailjs from 'emailjs-com';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Zoom from 'react-reveal/Zoom';
import useStyles from './Style';


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
                    <p><i class="far fa-copyright"></i> All Rights Reserved | 2023</p>
                </Box>
                </Box>
            </Box>)
}

export default Contact;
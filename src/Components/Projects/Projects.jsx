import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Fade from 'react-reveal/Fade';


const data = [{
    title: 'Extract',
    description: 'Extract is a primitive form of Google Tesseract which is used to extract texts from images. It is written in python using tensorflow.',
    href: 'https://github.com/malikakarsh/EXTRACT'
},
{
    title: 'Face Recognition',
    description: "Face Recognition uses Machine Learning to predict on the user's face. It is written in python using Keras and Tkinter.",
    href: 'https://github.com/malikakarsh/Face-Recognition'
},
{
    title: 'Scanner',
    description: 'A document scanner to scan sheets detecting its edges and converting them to a pdf file format. Written in python using OpenCV.',
    href: 'https://github.com/malikakarsh/Scanner'
},
{
    title: 'enShroud',
    description: 'A steganography tool to hide secret texts in white space.',
    href: 'https://github.com/malikakarsh/enShroud'
},
{
    title: 'DWoC Server Maintainer',
    description: 'Delta Winter of Code (DWoC) is a winter long program organised by Delta Force, the coding club of NIT Trichy.',
    href: 'https://dwoc.io'
},
{
    title: 'Pragyan Premiere League',
    description: 'PPL is an annual virtual cricket league in which matches are algorithmically simulated.',
    href: 'https://delta.nitt.edu/projects/'
},
{
    title: 'Pragyan Capture The Flag',
    description: 'A cybersecurity event in which players attempt to exploit and attack an application to retrieve the secret flag.',
    href: 'https://github.com/malikakarsh/PragyanCTF'
},
{
    title: 'inSecure',
    description: 'A dockerized container which can be accessed as SSH with security implementations!',
    href: 'https://github.com/malikakarsh/inSecure'
}]
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        height: '100%',
        overflowX: 'hidden',
        [theme.breakpoints.down('sm')]: {
            marginTop: '0rem',
            height: '100%'
        },
        [theme.breakpoints.up('md')]: {
            marginTop: '3%',
            height: '100%'
        }
    },
    container: {
        overflowY: 'hidden',
        padding: theme.spacing(5),
        flexGrow: 1,
        [theme.breakpoints.down('md')]: {
            paddingTop: '10rem',
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: '5rem',
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: '7%',
        }
    },
    paper: {
    boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
    padding: theme.spacing(3),
    margin: theme.spacing(0),
    textAlign: 'center',
    backgroundColor: 'rgb(1, 41, 59)',
    height: '25vh',
    [theme.breakpoints.down('sm')]: {
            height: '22vh',
        },
  },
  header4: {
        color: 'white',
        fontFamily: 'Poiret One',
        fontSize: '1.2rem',
        '@media (min-width:600px)': {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.3rem',
        },
    },
    anchor: {
        textDecoration: 'none',
        color: 'white',
        transitionDelay: '0.03s',
        '&:hover': {
            color: 'grey'
        }
    },
    header2: {
        color: 'white',
        fontFamily: 'Poiret One',
        fontSize: '1.5rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.down('md')]: {
            fontSize: '2.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.5rem',
        },
    }
}));

const Projects = () => {
    const classes = useStyles();
    return (<Box className={classes.root} id='projects'>
                <Container maxWidth="lg" className={classes.container}>
                <Fade left>
                    <h2 className={classes.header2}>Projects</h2>
                    <Box style={{textAlign: 'center'}}>
                    <Grid container spacing={5}>
                        {data.map((text)=> {
                            return (<Grid item xs={12} sm={6} md={4} lg={3} alignItems='center'>
                                    <Box component="div" className={classes.paper}>
                                        <h1 className={classes.header4}>{text.title} <a href={text.href} target="_blank" className={classes.anchor}><i class="fas fa-location-arrow"></i></a></h1>
                                        <div style={{borderTop: '1px dashed white'}}></div>
                                        <p style={{color: 'white'}}>{text.description}</p>
                                    </Box>
                                    </Grid>)
                        })}
                    </Grid>
                    </Box>
                    </Fade>
                </Container>
        
    </Box>);
}

export default Projects;
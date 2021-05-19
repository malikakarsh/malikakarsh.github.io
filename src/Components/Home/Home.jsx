import React,{ useEffect ,useRef } from 'react';
import Box from '@material-ui/core/Box';
import Typist from 'react-typist';
import { makeStyles } from '@material-ui/core/styles';
import { useDencrypt } from "use-dencrypt-effect";
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Fade from 'react-reveal/Fade';


const aboutIcons = [{
    icon: "fab fa-github",
    href: '#'
},
{
    icon: "fab fa-linkedin-in",
    href: '#'
},
{
    icon: "fab fa-twitter",
    href: '#'
}]

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const theme = createMuiTheme();
 
const values = ["I'm An ICE Junior", "A Software Developer"];

const useStyles = makeStyles((theme) => ({
    box: {
        height: '100vh',
        color: 'rgb(247, 247, 247)',
        justifyContent: 'center',
        overflowX: 'hidden',
    },
    header1: {
        paddingTop: theme.spacing(1.5),
        marginTop: 0,
        fontFamily: 'Poiret One',
        fontSize: '2rem',
        '@media (min-width:300px)': {
            fontSize: '2rem',
        },
        '@media (min-width:600px)': {
            fontSize: '3rem',
        },
        '@media (min-width:1000px)': {
            fontSize: '3rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '4rem',
        },
        [theme.breakpoints.up('lg')]: {
            fontSize: '4.5rem',
        },
    },

    header3: {
        fontSize: '1rem',
        '@media (min-width:600px)': {
            fontSize: '1.2rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.7rem',
        },
    },
    divbox: {
        padding: theme.spacing(8),
        paddingTop: '20%',
        marginLeft: '0%',
        '@media (min-width:250px)': {
        paddingTop: '40%',
        padding: theme.spacing(4)
    },
        [theme.breakpoints.up('sm')]: {
        paddingTop: '30%',
        marginLeft: '0',
    },

        [theme.breakpoints.up('md')]: {
        paddingTop: '15%',
        marginLeft: '10%'
    },
        [theme.breakpoints.up('lg')]: {
        paddingTop: '15%',
    }},
    iconTop: {
        marginBottom: theme.spacing(0),
        paddingLeft: theme.spacing(0.5),
        [theme.breakpoints.up('xs')]: {
        paddingLeft: theme.spacing(0),
    },
    [theme.breakpoints.up('sm')]: {
        paddingLeft: theme.spacing(0.5),
    }
    },
    
    icons: {
        fontSize: '1.5rem',
        margin: theme.spacing(5),
        marginLeft: theme.spacing(0),
        transitionDelay: '0.1s',
        color: 'white',
        '&:hover': {
            color: 'rgb(241, 124, 28)'
        },
        [theme.breakpoints.down('xs')]: {
        fontSize: '1rem'
    },
        },
    
    last: {
        textAlign: 'right'
    },
    
    buttons: {
        borderRadius: theme.spacing(0),
        padding: theme.spacing(4),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        [theme.breakpoints.up('xs')]: {
        marginLeft: '40%',
        marginTop: '40%'
    },
        [theme.breakpoints.up('sm')]: {
        marginTop: '20%',
        marginRight: '20%'
    },

        [theme.breakpoints.up('md')]: {
        marginRight :'10%'
    },
        [theme.breakpoints.up('lg')]: {
        marginRight: '0'
    }
    }
}));

const Home = () => {
    const myRef = useRef(null)
    const executeScroll = () => scrollToRef(myRef)
    const classes = useStyles();
    const { result, dencrypt } = useDencrypt();

    useEffect(() => {
        let i = 0;

        const action = setInterval(() => {
        dencrypt(values[i]);

        i = i === values.length - 1 ? 0 : i + 1;
        }, 4000);

        return () => clearInterval(action);
    }, []);
    return (
        <Box id='home' className={classes.box}>
            <Container maxWidth="lg" className={classes.divbox}>
            <Fade right delay={3000}>
                <h4 className={classes.iconTop}>
                        {aboutIcons.map((text) => {
                            return <a href={text.href} className={classes.icons}><i className={text.icon}></i></a>
                        })}
                </h4>
            </Fade>
            <h1 className={classes.header1} style={{marginBottom: theme.spacing(1)}}>
                <Typist avgTypingDelay={80} cursor={{show: false}} startDelay={1000}>
                    Hi there, I'm Akarsh Malik
                </Typist>
            </h1>
                <p className={classes.header3} style={{paddingLeft: theme.spacing(0.5)}}>
                    {result}
                </p>
            <Box container='div' className={classes.last}>
            <Fade left top delay={4100}>
                <a href="#about" style={{color: 'inherit',textDecoration: 'none'}}><Button variant="contained" style={{backgroundColor: 'rgb(241, 124, 28)',color: 'white'}} className={classes.buttons}><i class="fas fa-angle-double-down" style={{marginRight: theme.spacing(2)}}></i>EXPLORE</Button></a>
            </Fade>
            </Box>
            </Container>
        </Box>);
}

export default Home;
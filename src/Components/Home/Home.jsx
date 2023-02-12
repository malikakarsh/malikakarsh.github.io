import React,{ useEffect ,useRef } from 'react';
import Box from '@material-ui/core/Box';
import Typist from 'react-typist';
import { useDencrypt } from "use-dencrypt-effect";
import { createTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Fade from 'react-reveal/Fade';
import useStyles from './Style';


const aboutIcons = [{
    icon: "fab fa-github",
    href: 'https://github.com/malikakarsh'
},
{
    icon: "fab fa-linkedin-in",
    href: 'https://www.linkedin.com/in/akarsh-malik-911221193/'
},
{
    icon: "fab fa-twitter",
    href: 'https://twitter.com/AkarshMalik'
}]

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const theme = createTheme();
 
const values = ["I'm An ICE Senior", "A Software Developer"];

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
            <Box component="div" className={classes.divbox}>
            <Fade right delay={3000}>
                <h4 className={classes.iconTop}>
                        {aboutIcons.map((text) => {
                            return <a href={text.href} target="_blank" className={classes.icons}><i className={text.icon}></i></a>
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
            </Box>
        </Box>);
}

export default Home;
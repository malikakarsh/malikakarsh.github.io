import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import profile from '../../imgs/profile4.png';
import Grid from '@material-ui/core/Grid';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import Fade from 'react-reveal/Fade';


const data = [{
    Title: 'About Me',
    About: "I'm an Instrumentation and Control junior pursuing my B.tech in National Institute of Technology, Tiruchirappalli.",
    Description: 'Currently a system administrator at Delta Force (premiere coding club of NITT), I love reading about different web vulnerabilities and discovering bugs in web applications.',
    Extend: 'My hobbies include playing badminton, T.T, singing and playing guitar. '
}];

const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
}

const theme = createMuiTheme();

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
};



const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        paddingLeft: theme.spacing(20),
        paddingTop: '0%',
        
    },
    container: {
        paddingLeft: theme.spacing(0),
        paddingTop: '10%',
        [theme.breakpoints.down('sm')]: {
            paddingTop: '0%',
        },
    },
    header2: {
        fontFamily: 'Poiret One',
        fontSize: '1.5rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '2.5rem',
        },
    },
    grid: {
        padding: theme.spacing(8),
        paddingRight: theme.spacing(20),
        paddingLeft: theme.spacing(4),
        [theme.breakpoints.down('md')]: {
            paddingRight: theme.spacing(0),
        },
        [theme.breakpoints.down('sm')]: {
            paddingTop: theme.spacing(4),
        }
    },
    desc: {
    },
    imgs: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
        height: '32rem',
        [theme.breakpoints.down('sm')]: {
            height: '20rem',
        },
    },
    icons: {
        display: 'flex',
        backgroundColor: 'yellow',
        justifyContent: 'space-around'
    },
    buttons: {
        marginTop: theme.spacing(3),
        backgroundColor: 'rgb(241, 124, 28)',
        color: 'white',
        padding: theme.spacing(4),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        borderRadius: theme.spacing(0),
    },
    anchor: {
        paddingLeft: theme.spacing(0),
        textDecoration: 'none',
        color: 'white',
    },
    box: {
        flexGrow: 1,
        overflowX: 'hidden',
        overflowY: 'hidden',
        marginBottom: theme.spacing(5),
        color: 'rgb(247, 247, 247)',
        justifyContent: 'center',
        [theme.breakpoints.down('lg')]: {
            height: '100%',
        },
        [theme.breakpoints.down('sm')]: {
            height: '100%',
            marginTop: '0%'
        }
    }}));


const About = () => {
    const classes = useStyles();
    return (<Box id='about' component="div" className={classes.box}>
                <Container className={classes.container}>
                <Fade right delay={200}>
                <Grid container spacing={3} className={classes.grid}>
                    <Grid item xs={12} md={6} className={classes.imgs}>
                        <img src={profile} className={classes.imgs}></img>
                    </Grid>
                    <Grid item xs={12} md={6} className={classes.desc}>
                        <h2 className={classes.header2}>
                        {data.map((text)=> {
                            return text.Title})}
                        </h2>
                        <p>{data.map((text)=> {
                            return text.About})}</p>
                        <p>{data.map((text)=> {
                            return text.Description})}</p>
                        <p>{data.map((text)=> {
                            return text.Extend})}</p>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <p style={{color: 'rgb(241, 124, 28)'}}><b>Education:</b></p>
                                <p><b>NIT Trichy</b></p>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <p style={{color: 'rgb(241, 124, 28)'}}><b>Age:</b></p>
                                <p><b>21</b></p>
                            </Grid>
                        </Grid>
                        <div style={{borderTop: '1px dashed white',marginTop: theme.spacing(8)}}></div>
                        <Box constainer='div'>
                                <a href='https://drive.google.com/u/0/uc?id=126dY9tebJmF7OlydFzKVNLIhjhrS3BlE&export=download' className={classes.anchor}><Button variant="contained" className={classes.buttons}><i class="fas fa-download"></i><span style={{paddingLeft: '15px'}}>RESUME</span></Button></a>
                        </Box>
                    </Grid>
                </Grid>
                </Fade> 
                </Container>
            </Box>);
}

export default About;
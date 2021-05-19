import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Zoom from 'react-reveal/Zoom';

const data = [{
    icon: 'fas fa-code',
    title: 'Web Development',
    description: 'I have worked on projects involving MERN stack.'
},
{
    icon: 'fas fa-tools',
    title: 'System Administration',
    description: 'I have experience in handling servers for various web apps.'
},
{
    icon: 'fas fa-brain',
    title: 'Machine Learning',
    description: 'I have worked on projects involving Convolutional Neural Networks.'
},
{
    icon: 'fas fa-bug',
    title: 'Bug Hunting',
    description: 'Currently I am exploring this domain and learning about various bugs.'
}]

const prog = [{
    icon: 'devicon-html5-plain',
    level: 'intermediate'
},
{
    icon: 'devicon-css3-plain',
    level: 'intermediate'
},
{
    icon: 'devicon-javascript-plain',
    level: 'intermediate'
},
{
    icon: 'devicon-react-original',
    level: 'intermediate'
},
{
    icon: 'devicon-python-plain',
    level: 'intermediate'
},
{
    icon: 'devicon-cplusplus-plain-wordmark',
    level: 'intermediate'
},
{
    icon: 'devicon-bash-plain',
    level: 'intermediate'
},
{
    icon: 'devicon-materialui-plain',
    level: 'intermediate'
},
{
    icon: 'devicon-bootstrap-plain',
    level: 'intermediate'
},
{
    icon: 'devicon-mysql-plain',
    level: 'basic'
},
{
    icon: 'devicon-go-plain',
    level: 'basic'
}];

const tools = [{
    icon: 'devicon-git-plain'
},
{
    icon: 'devicon-docker-plain'
},
{
    icon: 'devicon-apache-plain'
},
{
    icon: 'devicon-linux-plain'
},
{
    icon: 'devicon-visualstudio-plain'
}]
const useStyles = makeStyles((theme) => ({
    root: {
        height: '100%',
        flexGrow: '1'
    },
    paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: 'rgb(241, 124, 28)',
    backgroundColor: 'inherit',
    fontSize: '2rem',
    [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem',
        },
  },
  container: {
    paddingTop: '7%',
    textAlign: 'left',

  },
  para: {
      fontSize: '1rem',
      color: 'white'
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
            paddingLeft: theme.spacing(2),
            paddingTop: theme.spacing(5)
        },
    },
    header3: {
        paddingTop: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        color: 'white',
        fontFamily: 'Poiret One',
        fontSize: '1.5rem',
        '@media (min-width:600px)': {
            fontSize: '1.5rem',
        },
        [theme.breakpoints.up('md')]: {
            fontSize: '1.7rem',
        },
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
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
  skillhead: {
      textAlign: 'left',
  },
  iconpack: {
      color: 'white',
      justifyContent: 'center',
      textAlign: 'center',
      fontSize: '2.2rem',
      padding: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
            fontSize: '1.5rem',
        },
  }

}));

const Skills = () => {
    const classes = useStyles();
    return (<Box id='skills' className={classes.root}>
        <Container className={classes.container}>
        <Zoom>
            <h2 className={classes.header2}>Skills</h2>
            <Grid container spacing={0}>
            {data.map((text)=> {
                return (<Grid item xs={12} md={3}>
                            <Box container="div" className={classes.skillhead}>
                                <Paper className={classes.paper}>
                                    <i class={text.icon}></i>
                                    <h4 className={classes.header4}>{text.title}</h4>
                                    <p className={classes.para}>{text.description}</p>
                                </Paper>
                            </Box>
                </Grid>);
            })}
            <h3 className={classes.header3}>Programming Languages & Frameworks</h3> 
            </Grid>
            <Grid container spacing={0}>
                {prog.map((text) => {
                    return (<Grid item xs={2} md={1}>
                                <Box container="div" className={classes.iconpack}>
                                    <i class={text.icon}></i>
                                </Box>
                            </Grid>);
                })}
            </Grid>
            <h3 className={classes.header3}>Tools & Technologies</h3> 
            <Grid container spacing={0}>
                {tools.map((text) => {
                    return (<Grid item xs={2} md={1}>
                                <Box container="div" className={classes.iconpack}>
                                    <i class={text.icon}></i>
                                </Box>
                            </Grid>);
                })}
            </Grid>
        </Zoom>
        </Container>
        
    </Box>);
}

export default Skills;
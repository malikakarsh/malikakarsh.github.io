import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    box: {
        marginBottom: theme.spacing(4),
        height: '100%',
        color: 'rgb(247, 247, 247)',
        justifyContent: 'center',
        overflowX: 'hidden',
        [theme.breakpoints.down('sm')]: {
            height: '100vh',
        },
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
        overflowX: 'hidden',
        overflowY: 'hidden',
        padding: theme.spacing(10),
        paddingLeft: theme.spacing(25),
        paddingRight: theme.spacing(25),
        marginLeft: '0%',
        '@media (min-width:250px)': {
        paddingTop: '40%',
    },
        [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(4),
        paddingTop: '35%',
    },

        [theme.breakpoints.up('md')]: {
        paddingTop: '15%',
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
        fontSize: '1.3rem'
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
           [theme.breakpoints.down('lg')]: {
        marginRight: '5%',
        marginTop: '20%',
    },

        [theme.breakpoints.down('md')]: {
        marginRight :'0%',
        marginTop: '20%',
    },
        [theme.breakpoints.down('sm')]: {
        marginTop: '40%',
        marginRight: '0%'
    },
        [theme.breakpoints.down('xs')]: {
        marginLeft: '40%',
        marginTop: '55%'
    },
     
    }
}));

export default useStyles;
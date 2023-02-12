import { makeStyles } from '@material-ui/core/styles';

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

export default useStyles;
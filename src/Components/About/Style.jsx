import { makeStyles } from '@material-ui/core/styles';



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
            paddingTop: theme.spacing(6),
        }
    },
    desc: {
    },
    imgs: {
        marginBottom: theme.spacing(4),
        textAlign: 'center',
        height: '32rem',
        [theme.breakpoints.down('sm')]: {
            height: '25rem',
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

    export default useStyles;
import { makeStyles } from '@material-ui/core/styles';

let primaryColor = 'rgb(247, 247, 247)';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowX: 'hidden',
  },
  appbar: {
    minHeight: '0px',
    backgroundColor: primaryColor,
    top: 0,
    position: 'fixed'
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1
  },
  buttons: {
      padding: theme.spacing(1.9),
      borderTop: `3px solid ${primaryColor}`,
      borderTopRightRadius: 0,
      borderTopLeftRadius: 0,
      color: 'rgb(94, 94, 94)',
      transition: 'background-color 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 0ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms',
      transitionDelay: '0s',
      '&:hover': {
        borderTop: '3px solid rgb(241, 124, 28)',
        backgroundColor: "inherit",
        color:   '#000'
      },
     
  },

  anchor: {
    textDecoration: 'none'
  },

  box: {
      marginRight: theme.spacing(25)
  }
  
}));

export default useStyles;
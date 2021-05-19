import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import clsx from 'clsx';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';



const navList = [{
    name: 'HOME',
    href: '#home'
},
{
    name: 'ABOUT',
    href: '#about'
  },
  {
    name: 'SKILLS',
    href: '#skills'
  },
  {
    name: 'PROJECTS',
    href: '#projects'
  },
  {
    name: 'CONTACT',
    href: '#contact'
  }];

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

const Nav = () => {
  const classes = useStyles();
  const [state, setState] = React.useState({top: false});

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };
  const ListItemLink = (props) => {
  return <ListItem button component="a" {...props} />;
}

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top'
})}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {navList.map((text) => (
          <ListItemLink href={text.href}>
            <ListItemText primary={text.name} />
        </ListItemLink>
        ))}
      </List>
      <Divider />
    </div>
  );
  return (
    <div className={classes.root}>
            <AppBar className={classes.appbar} position="static">
                <Toolbar style={{minHeight: '0px'}}>
                <Hidden mdUp>
                <IconButton edge="start" className={classes.menuButton} color={primaryColor} aria-label="menu" onClick={toggleDrawer('top', true)}>
                    <MenuIcon />
                </IconButton>
                <Drawer anchor={'top'} open={state['top']} onClose={toggleDrawer('top', false)}>
                {list('top')}
                </Drawer>
                </Hidden>
                <Typography variant="h6" className={classes.title}>
                </Typography>
                <Hidden smDown>
                    <div className={classes.box}>
                    {navList.map((obj) => {
                        return <a className={classes.anchor} href={obj.href}><Button color="inherit" className={classes.buttons} disableTouchRipple="true">{obj.name}</Button></a>
                    })}
                    </div>
                    
                </Hidden>
                </Toolbar>
            </AppBar>
    </div>
  );
}

export default Nav;
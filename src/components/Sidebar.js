import React, { useState } from 'react';
import clsx from 'clsx';

import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItems from './ListItems';
import useStyles from '../hooks/useStyles'
import Fab from "@material-ui/core/Fab";
import { Brightness5Rounded, Brightness4Rounded } from "@material-ui/icons";
import Box from '@material-ui/core/Box';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import AuthForm from './AuthForm';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';


export default function Sidebar({ title, changeTheme, darkState }) {

    const sidebar = window.sessionStorage.getItem('open') === null || window.sessionStorage.getItem('open') === 'false' ? false : true
    const classes = useStyles();
    const [open, setOpen] = useState(sidebar);

    const handleDrawerOpen = () => {
        setOpen(true);
        window.sessionStorage.setItem('open', true)
    };
    const handleDrawerClose = () => {
        setOpen(false);
        window.sessionStorage.setItem('open', false)
    };
    const handleThemeChange = () => {
        changeTheme(darkState)
    };


    return (
        <>
            <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {title}
                    </Typography>
                    <PopupState variant="popover" popupId="demo-popup-popover">
                        {(popupState) => (
                            <div>
                                <Fab size="small" color="primary" style={{ marginRight: 2 }} {...bindTrigger(popupState)}>
                                    <AccountCircleIcon color="inherit" />
                                </Fab>
                                <Popover
                                    {...bindPopover(popupState)}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'center',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'center',
                                    }}
                                >
                                    <Box p={2}>
                                            <AuthForm
                                             />
                                    </Box>
                                </Popover>
                            </div>
                        )}
                    </PopupState>
                    <Fab size="small" color="primary" style={{ marginLeft: 2 }} onClick={handleThemeChange}>
                        {darkState
                            ?
                            <Brightness5Rounded color="inherit" />
                            :
                            <Brightness4Rounded color="inherit" />
                        }
                    </Fab>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItems />
                </List>
            </Drawer>
        </>
    )
}
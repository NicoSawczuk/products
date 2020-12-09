import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/core/styles";

import Sidebar from '../components/Sidebar'
import ListOfProducts from '../components/ListOfProducts';
import useStyles from '../hooks/useStyles'
import useTheme from '../hooks/useTheme';

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

export default function ProductsContainer() {
    const classes = useStyles();
    const { darkTheme, changeTheme, darkState } = useTheme()

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <Sidebar title="Productos" changeTheme={changeTheme} darkState={darkState} />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    <Container maxWidth="lg" className={classes.container} spacing={2}>
                        <Grid container >
                            <ListOfProducts />
                        </Grid>
                    </Container>
                </main>
            </div>
        </ThemeProvider>
    );
}
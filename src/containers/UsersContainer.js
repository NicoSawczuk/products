import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Sidebar from '../components/Sidebar'
import ListOfProducts from '../components/ListOfProducts';
import useStyles from '../hooks/useStyles'
import useTheme from '../hooks/useTheme'; import Card from '@material-ui/core/Card';
import { saveProduct, updateProduct, deleteProduct } from '../services/ProductsService'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ProductForm from '../components/ProductForm';
import { db } from '../config'
import ModalDelete from './../components/ModalDelete';
import UsersTable from './../components/UsersTable';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UsersContainer() {
    const classes = useStyles();
    const { darkTheme, changeTheme, darkState } = useTheme()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(function () {
        setLoading(true)
        const suscribe = async () => {
            db.collection('users')
                .onSnapshot(function (data) {
                    setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc })))
                    console.log(users)
                    setLoading(false)
                })
        } 
        suscribe();
    }, [])

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <Sidebar title="Usuarios" changeTheme={changeTheme} darkState={darkState} />
                <main className={classes.content}>
                    {loading ? <CircularProgress disableShrink style={{ position: "absolute", top: "50%", left: "50%" }} />
                        :
                        <React.Fragment>
                            <div className={classes.appBarSpacer} />
                            <Container maxWidth="lg" className={classes.container} spacing={2}>

                                <Grid container >
                                    <UsersTable
                                        rows={users}
                                    />
                                </Grid>
                            </Container>
                        </React.Fragment>}
                </main>
            </div>
        </ThemeProvider>
    );
}
import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Sidebar from '../components/Sidebar'
import ListOfProducts from '../components/ListOfProducts';
import useStyles from '../hooks/useStyles'
import useTheme from '../hooks/useTheme'; import Card from '@material-ui/core/Card';
import { saveProduct } from '../services/ProductsService'

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import ProductForm from '../components/ProductForm';
import { db } from '../config'

export default function ProductsContainer() {
    const classes = useStyles();
    const { darkTheme, changeTheme, darkState } = useTheme()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)


    useEffect(function () {
        setLoading(true)
        const suscribe = async () => {
            db.collection('products')
                .onSnapshot(function (data) {
                    setProducts(data.docs.map(doc => ({ ...doc.data(), id: doc })))
                    setLoading(false)
                })
        }
        suscribe();
    }, [])
    
    const handleSubmitProduct = (data) => {
        setLoading(true)
        saveProduct(data)
            .then((products) => {
                console.log(products)
                setProducts(products)
                setLoading(false)
            })
            .catch((error) => {
                console.log(error)
            })
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.root}>
                <CssBaseline />
                <Sidebar title="Productos" changeTheme={changeTheme} darkState={darkState} />
                <main className={classes.content}>
                    {loading ? <CircularProgress disableShrink style={{ position: "absolute", top: "50%", left: "50%" }} />
                        :
                        <React.Fragment>
                            <div className={classes.appBarSpacer} />
                            <Container maxWidth="lg" className={classes.container} >
                                <Grid container direction="row" justify="center" alignitems="center">
                                    <Card variant="outlined">
                                        <ProductForm
                                            saveProduct={handleSubmitProduct}
                                        />
                                    </Card>
                                </Grid>
                            </Container>
                            <Container maxWidth="lg" className={classes.container} spacing={2}>

                                <Grid container >
                                    <ListOfProducts
                                        products={products} />
                                </Grid>
                            </Container>
                        </React.Fragment>}
                </main>
            </div>
        </ThemeProvider>
    );
}
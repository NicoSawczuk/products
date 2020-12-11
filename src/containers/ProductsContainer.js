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

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function ProductsContainer() {
    const classes = useStyles();
    const { darkTheme, changeTheme, darkState } = useTheme()
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({
        title: '',
        description: '',
        price: '',
        image: ''
    })
    const [alert, setAlert] = useState(false)
    const [alertState, setAlertState] = useState({
        message: '',
        type: '',
        vertical: '',
        horizontal: ''
    })

    const [openModal, setOpenModal] = useState(false);
    const [idProductDelete, setIdProductDelete] = useState('')

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

    const handleCloseAlert = () => {
        setAlert(!alert)
    }

    const handleClickOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const handleSubmitProduct = (data) => {
        setLoading(true)
        saveProduct(data)
            .then((products) => {
                setProducts(products)
                setForm({
                    title: '',
                    description: '',
                    price: '',
                    image: ''
                })
                setLoading(false)
                setAlertState({
                    message: 'Producto cargado correctamente',
                    type: 'success',
                    vertical: 'bottom',
                    horizontal: 'right'
                })
                setAlert(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleEditProduct = (data) => {
        setLoading(true)
        updateProduct(data.id, data, 'products')
            .then(() => {
                setForm({
                    title: '',
                    description: '',
                    price: '',
                    image: ''
                })
                setEditing(false)
                setLoading(false)
                setAlertState({
                    message: 'Producto modificado correctamente',
                    type: 'success',
                    vertical: 'bottom',
                    horizontal: 'right'
                })
                setAlert(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleDeleteProduct = (id) => {
        setOpenModal(false)
        setLoading(true)
        deleteProduct(id, 'products')
            .then(() => {
                setOpenModal(false)
                setLoading(false)
                setAlertState({
                    message: 'Producto eliminado correctamente',
                    type: 'success',
                    vertical: 'bottom',
                    horizontal: 'right'
                })
                setAlert(true)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    const handleButtonEdit = (data) => {
        setForm(data)
        setEditing(true)
    }
    const handleButtonDelete = (id) => {
        setOpenModal(true)
        setIdProductDelete(id)
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
                                <Snackbar open={alert}
                                    autoHideDuration={4000}
                                    onClose={handleCloseAlert}
                                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                                    <Alert onClose={handleCloseAlert} severity="success">
                                        {alertState.message}
                                    </Alert>
                                </Snackbar>

                                <ModalDelete
                                    title="Eliminar producto"
                                    description={`¿Esta seguro que desea eliminar el producto con ID: ${idProductDelete}?`}
                                    openModal={openModal}
                                    idObjectDelete={idProductDelete}
                                    handleClickOpenModal={handleClickOpenModal}
                                    handleCloseModal={handleCloseModal}
                                    handleDeleteObject={handleDeleteProduct}
                                />
                                <Grid container direction="row" justify="center" alignitems="center">
                                    <Card variant="outlined">
                                        <ProductForm
                                            saveProduct={handleSubmitProduct}
                                            updateProduct={handleEditProduct}
                                            form={form}
                                            setForm={setForm}
                                            editing={editing}
                                        />
                                    </Card>
                                </Grid>
                            </Container>
                            <Container maxWidth="lg" className={classes.container} spacing={2}>

                                <Grid container >
                                    <ListOfProducts
                                        products={products}
                                        onEdit={handleButtonEdit}
                                        onDelete={handleButtonDelete} />
                                </Grid>
                            </Container>
                        </React.Fragment>}
                </main>
            </div>
        </ThemeProvider>
    );
}
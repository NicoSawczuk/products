import React, { useEffect, useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';
import Sidebar from '../components/Sidebar'
import useStyles from '../hooks/useStyles'
import useTheme from '../hooks/useTheme'; import Card from '@material-ui/core/Card';
import { saveUser, updateUser, deleteUser } from '../services/UsersService'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { db } from '../config'
import ModalDelete from './../components/ModalDelete';
import UsersTable from './../components/UsersTable';
import UserForm from '../components/UserForm';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UsersContainer() {
    const classes = useStyles();
    const { darkTheme, changeTheme, darkState } = useTheme()
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [editing, setEditing] = useState(false)
    const [form, setForm] = useState({
        firstname: '',
        lastname: '',
        birthdate: '',
    })

    const [alert, setAlert] = useState(false)
    const [alertState, setAlertState] = useState({
        message: '',
        type: '',
        vertical: '',
        horizontal: ''
    })

    const [openModal, setOpenModal] = useState(false);
    const [idUserDelete, setIdUserDelete] = useState('')

    useEffect(function () {
        setLoading(true)
        const suscribe = async () => {
            db.collection('users')
                .onSnapshot(function (data) {
                    setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc })))
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


    const handleSubmitUser = (data) => {
        setLoading(true)
        saveUser(data)
            .then((users) => {
                setForm({
                    firstname: '',
                    lastname: '',
                    birthdate: '',
                })
                setUsers(users)
                setLoading(false)
                setAlertState({
                    message: 'Usuario cargado correctamente',
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

    const handleEditUser = (data) => {
        setLoading(true)
        updateUser(data.id, data, 'users')
            .then(() => {
                setForm({
                    firstname: '',
                    lastname: '',
                    birthdate: '',
                })
                setEditing(false)
                setLoading(false)
                setAlertState({
                    message: 'Usuario modificado correctamente',
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

    const handleDeleteUser = (id) => {
        setOpenModal(false)
        setLoading(true)
        deleteUser(id, 'users')
            .then(() => {
                setOpenModal(false)
                setLoading(false)
                setAlertState({
                    message: 'Usuario eliminado correctamente',
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
        setIdUserDelete(id)
    }


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
                                    description={`¿Esta seguro que desea eliminar el producto con ID: ${idUserDelete}?`}
                                    openModal={openModal}
                                    idObjectDelete={idUserDelete}
                                    handleClickOpenModal={handleClickOpenModal}
                                    handleCloseModal={handleCloseModal}
                                    handleDeleteObject={handleDeleteUser}
                                />
                                <Grid container direction="row" justify="center" alignitems="center">
                                    <Card variant="outlined">
                                        <UserForm
                                            saveUser={handleSubmitUser}
                                            updateUser={handleEditUser}
                                            form={form}
                                            setForm={setForm}
                                            editing={editing}
                                        />
                                    </Card>
                                </Grid>
                            </Container>
                            <Container maxWidth="lg" className={classes.container} spacing={2}>

                                <Grid container >
                                    <UsersTable
                                        rows={users}
                                        onEdit={handleButtonEdit}
                                        onDelete={handleButtonDelete}
                                    />
                                </Grid>
                            </Container>
                        </React.Fragment>}
                </main>
            </div>
        </ThemeProvider>
    );
}
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import useAuth from '../hooks/useAuth'
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Container from '@material-ui/core/Container';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));


export default function AuthForm() {
    const classes = useStyles();
    const { login, register, signOut, isLogged, getCurrentUser, errorMessage, setErrorMessage } = useAuth()
    const [form, setForm] = useState({
        email: '',
        password: '',
    })
    const [errorForm, setErrorForm] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState('')
    const [logged, setLogged] = useState(true)

    const [alert, setAlert] = useState(false)
    useEffect(function () {
        if (errorMessage !== '') {
            setError(errorMessage)
            setAlert(true)
            setErrorMessage('')
        } else {
            setAlert(false)
        }
    }, [errorMessage])


    const toggleChecked = () => {
        setLogged((login) => !login)
    };

    const handleCloseAlert = () => {
        setAlert(!alert)
    }


    const validateData = (data) => {
        let { email, password } = data
        let errorEmail = ''
        let errorPassword = ''
        if ((email === null || email.length === 0)) {
            errorEmail = 'Datos incorrectos'
            setErrorForm({
                email: errorEmail,
                description: errorPassword,
            });
            return false
        }
        if ((password === null || password.length === 0)) {
            errorPassword = 'Datos incorrectos'
            setErrorForm({
                email: errorEmail,
                password: errorPassword,
            });
            return false
        }
        setErrorForm({
            email: '',
            password: '',
        })
        return true

    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (validateData(form)) {
            console.log('Sin errores')
            if (logged) {
                login(form)
            } else {
                register(form)
            }
        }
    }

    const handleSignOut = () => {
        signOut()
    }


    return (
        <React.Fragment>
            <Container maxWidth="lg" className={classes.container} >
                <Snackbar open={alert}
                    autoHideDuration={4000}
                    onClose={handleCloseAlert}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
                    <Alert onClose={handleCloseAlert} severity="error">
                        {error}
                    </Alert>
                </Snackbar>
            </Container>
            {!isLogged()
                ? <>
                    <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                        <div>
                            <FormGroup>
                                <FormControlLabel
                                    control={<Switch checked={logged} onChange={toggleChecked} />}
                                    label="Ingresar"
                                />
                            </FormGroup>
                        </div>
                        <div>
                            {logged ? <b>Ingresar</b> : <b>Registrarse</b>}
                            <TextField error={errorForm.email !== '' ? true : false}
                                onChange={handleChange}
                                helperText={errorForm.email}
                                name="email"
                                type="email"
                                id="email"
                                label="Email"
                                variant="filled"
                                value={form.email} />
                        </div>

                        <div>
                            <TextField error={errorForm.password !== '' ? true : false}
                                onChange={handleChange}
                                helperText={errorForm.password}
                                name="password"
                                type="password"
                                id="password"
                                label="Contraseña"
                                variant="filled"
                                value={form.password} />
                        </div>

                        <div>
                            <Button
                                variant="contained"
                                color="default"
                                startIcon={<ArrowForwardIcon />}
                                type="submit" >
                                Confirmar
                    </Button>
                        </div>
                    </form>
                </> :
                <div>
                    <Typography variant="p" component="h2">
                        Hola {getCurrentUser()}
                    </Typography>
                    <Button label="Cerrar sesión" size="small" variant="contained" onClick={handleSignOut}>
                        <ExitToAppIcon />
                    </Button>
                </div>
            }
        </React.Fragment>
    )

}
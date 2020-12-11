import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';


const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function UserForm({ saveUser, updateUser, form, setForm, editing }) {
    const classes = useStyles();

    const [errorForm, setErrorForm] = useState({
        firstname: '',
        lastname: '',
        birthdate: '',
    })

    const validateData = (data) => {
        let { firstname, lastname, birthdate } = data
        let errorFirstname = ''
        let errorLastname = ''
        let errorBirthdate = ''
        if ((firstname === null || firstname.length === 0 || /^\s+$/.test(firstname))) {
            errorFirstname = 'Datos incorrectos'
            setErrorForm({
                firstname: errorFirstname,
                lastname: errorLastname,
                birthdate: errorBirthdate
            });
            return false
        }
        if ((lastname === null || lastname.length === 0 || /^\s+$/.test(lastname))) { 
            errorLastname = 'Datos incorrectos'
            setErrorForm({
                firstname: errorFirstname,
                lastname: errorLastname,
                birthdate: errorBirthdate
            });
            return false
        }
        if ((birthdate === '' )) {
            errorBirthdate = 'Datos incorrectos'
            setErrorForm({
                firstname: errorFirstname,
                lastname: errorLastname,
                birthdate: errorBirthdate
            });
            return false
        }
        setErrorForm({
            firstname: '',
            lastname: '',
            birthdate: '',
        })
        console.log(errorForm)
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
            if (!editing) {
                saveUser(form)
            } else {
                updateUser(form)
            }
        }
    }

    return (
        <React.Fragment>
            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                <TextField error={errorForm.firstname !== '' ? true : false}
                    onChange={handleChange}
                    helperText={errorForm.firstname}
                    name="firstname"
                    type="text"
                    id="firstname"
                    label="Nombre"
                    variant="filled"
                    value={form.firstname} />

                <TextField error={errorForm.lastname !== '' ? true : false}
                    onChange={handleChange}
                    helperText={errorForm.lastname}
                    name="lastname"
                    type="text"
                    id="lastname"
                    label="Apellido"
                    variant="filled"
                    value={form.lastname} />

                <TextField error={errorForm.birthdate !== '' ? true : false}
                    onChange={handleChange}
                    helperText={errorForm.birthdate}
                    name="birthdate"
                    type="date"
                    id="birthdate"
                    label="Cumpleaños"
                    variant="filled"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{ max: new Date().toISOString().split("T")[0] }}
                    value={form.birthdate} />

                <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    type="submit" >
                    Guardar
                </Button>
            </form>
        </React.Fragment>
    )
}
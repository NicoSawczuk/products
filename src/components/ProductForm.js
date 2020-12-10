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

export default function ProductForm({ saveProduct, updateProduct, form, setForm, editing }) {
    const classes = useStyles();

    const [errorForm, setErrorForm] = useState({
        title: '',
        description: '',
        price: '',
        image: ''
    })

    const validateData = (data) => {
        let { title, description, price, image } = data
        let errorTitle = ''
        let errorDescription = ''
        let errorPrice = ''
        let errorImage = ''
        if ((title === null || title.length === 0)) {
            errorTitle = 'Datos incorrectos'
            setErrorForm({
                title: errorTitle,
                description: errorDescription,
                price: errorPrice,
                image: errorImage
            });
            return false
        }
        if ((description === null || description.length === 0)) {
            errorDescription = 'Datos incorrectos'
            setErrorForm({
                title: errorTitle,
                description: errorDescription,
                price: errorPrice,
                image: errorImage
            });
            return false
        }
        if ((price === null || price.length === 0)) {
            errorPrice = 'Datos incorrectos'
            setErrorForm({
                title: errorTitle,
                description: errorDescription,
                price: errorPrice,
                image: errorImage
            });
            return false
        }
        if ((image === null || image.length === 0)) {
            errorImage = 'Datos incorrectos'
            setErrorForm({
                title: errorTitle,
                description: errorDescription,
                price: errorPrice,
                image: errorImage
            });
            return false
        }
        setErrorForm({
            title: '',
            description: '',
            price: '',
            image: ''
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
            if (!editing){
                saveProduct(form)
            }else{
                updateProduct(form)
            }
        }
    }

    return (
        <React.Fragment>
            <form className={classes.root} autoComplete="off" onSubmit={handleSubmit}>
                <TextField error={errorForm.title !== '' ? true : false}
                    onChange={handleChange}
                    helperText={errorForm.title}
                    name="title"
                    type="text"
                    id="title"
                    label="Titulo"
                    variant="filled"
                    value={form.title} />
                <TextField error={errorForm.description !== '' ? true : false}
                    onChange={handleChange}
                    helperText={errorForm.description}
                    name="description"
                    type="text"
                    id="description"
                    label="Descripcion"
                    variant="filled"
                    value={form.description} />
                <TextField error={errorForm.price !== '' ? true : false}
                    onChange={handleChange}
                    helperText={errorForm.price}
                    name="price"
                    type="number"
                    id="price"
                    label="Precio"
                    variant="filled"
                    value={form.price} />
                <TextField error={errorForm.image !== '' ? true : false}
                    onChange={handleChange}
                    helperText={errorForm.image}
                    name="image"
                    type="text"
                    id="link"
                    label="Link de imagen"
                    variant="filled"
                    value={form.image} />
                <Button
                    variant="contained"
                    color="default"
                    startIcon={<CloudUploadIcon />}
                    type="submit" >
                    Cargar
                </Button>
            </form>
        </React.Fragment>
    )
}
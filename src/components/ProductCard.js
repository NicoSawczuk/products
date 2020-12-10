import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { DialogTitle } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 241,
        minWidth: 241,
    },
    media: {
        height: 220,
    },
});
export default function ProductCard({ id, title, image, description, price, onEdit, onDelete }) {
    const classes = useStyles();

    const handleEdit = (e) => {
        const data = {
            id: id, 
            title: title, 
            image: image, 
            description: description, 
            price: price
        }
        onEdit(data)
    }

    const handleDelete = (e) => {
        onDelete(id)
    }
    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={image}
                    title={`ID: ${id}`}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<EditIcon />}
                    onClick={handleEdit}
                >
                    Editar
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    onClick={handleDelete}
                >
                    Borrar
                </Button>
            </CardActions>
        </Card>
    );
}

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
        maxWidth: 345,
        minWidth: 345,
    },
    media: {
        height: 220,
    },
});
export default function ProductCard(productData) {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={productData.productData.image}
                    title={productData.productData.title}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {productData.productData.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {productData.productData.description}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {productData.productData.price}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button
                    variant="contained"
                    color="default"
                    className={classes.button}
                    startIcon={<EditIcon />}
                >
                    Editar
                </Button>
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                >
                    Borrar
                </Button>
            </CardActions>
        </Card>
    );
}

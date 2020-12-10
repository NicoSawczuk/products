import React from 'react'
import ProductCard from './ProductCard'
import Grid from '@material-ui/core/Grid';



export default function ListOfProducts({ products }) {


    return (
        <>
            <Grid container justify="center" alignItems="center" spacing={8}>
                {products.map((element) => {
                    return (
                        <Grid item lg >
                            <ProductCard key={element.id.id}
                                productData={element}

                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
}
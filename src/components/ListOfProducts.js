import React from 'react'
import ProductCard from './ProductCard'
import Grid from '@material-ui/core/Grid';



export default function ListOfProducts({ products }) {


    return (
        <>
            <Grid container justify="center" alignItems="center" spacing={4}>
                {products.map((element) => {
                    return (
                        <Grid item >
                            <ProductCard key={element.id}
                                title={element.title}
                                image={element.image}
                                description={element.description}
                                price={element.price}

                            />
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
}
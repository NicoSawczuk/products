import React, { useEffect, useState } from 'react'
import { getProducts } from '../services/ProductsService'
import ProductCard from './ProductCard'
import Grid from '@material-ui/core/Grid';

import CircularProgress from '@material-ui/core/CircularProgress';

export default function ListOfProducts() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(function () {
        setLoading(true)
        getProducts()
            .then((products) => {
                setProducts(products)
                setLoading(false)
            }).catch(({ error }) => {
                setLoading(false)
                console.log(error)
            })
    }, [])

    return (
        <>
            {
                loading ? <CircularProgress disableShrink style={{ position: "absolute", top: "50%", left: "50%" }} />
                    : <>
                        <Grid container justify="center" alignItems="center" spacing={8}>
                            {products.map((element) => {
                                return (
                                    <Grid item lg >
                                        <ProductCard
                                            productData={element}
                                            
                                        />
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </>
            }
        </>
    );
}
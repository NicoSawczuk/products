import { db } from '../config'

export async function getProducts(collection = 'products') {
    var products = [];
    await db.collection(collection).get().then((data) => {
        data.docs.forEach((doc) => {
            const data = doc.data();
            const product = {
                id: doc.id,
                title: data.title,
                description: data.description,
                image: data.image,
                price: data.price
            }
            products.push(product)
        });
    });
    return products;
}

export async function saveProduct(data, collection = 'products') {
    db.collection(collection).add(data);
    return getProducts()
}
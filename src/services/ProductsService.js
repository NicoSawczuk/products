import { db } from '../config'

export async function getProducts(collection = 'products') {
    var products = [];
    await db.collection(collection).get().then((data) => {
        data.docs.forEach((doc) => {
            const data = doc.data();
            const product = {
                id: doc,
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

export function updateProduct(id, data, collection = 'products') {
    const recordRef = db.collection(collection).doc(id);
    return recordRef.update(data);
};

export function deleteProduct(id, collection = "products") {
    return db.collection(collection).doc(id).delete();
};
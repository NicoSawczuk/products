import { db } from '../config'

export async function getProducts(collection = 'products') {
    // return db.collection("products").get()
    //     .then(querySnapshot => {
    //         const data = querySnapshot.docs.map(doc => doc.data());
    //         console.log(data)
    //         return Object.values(data);
    //     });
    var products = [];
    await db.collection(collection).get().then((data)=>{
        data.docs.forEach((doc) => {
            const data = doc.data();
            const product = {
                title: data.title,
                description: data.description,
                image: data.image,
                price: data.price
            }
            products.push(product)
          });
    });
    console.log(products)
    return products;
}
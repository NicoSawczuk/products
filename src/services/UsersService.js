import { db } from '../config'

export async function getUsers(collection = 'users') {
    var users = [];
    await db.collection(collection).get().then((data) => {
        data.docs.forEach((doc) => {
            const data = doc.data();
            const user = {
                id: doc,
                firstname: data.firstname,
                lastname: data.lastname,
                birthdate: data.birthdate
            }
            users.push(user)
        });
    });
    return users;
}


export async function saveUser(data, collection = 'users') {
    db.collection(collection).add(data);
    return getUsers()
}

export function updateUser(id, data, collection = 'users') {
    const recordRef = db.collection(collection).doc(id);
    return recordRef.update(data);
};

export function deleteUser(id, collection = 'users') {
    return db.collection(collection).doc(id).delete();
};
import { useCallback, useState } from 'react'

import { firebase } from '../config'

const auth = firebase.auth();

export default function useAuth() {

    const [errorMessage, setErrorMessage] = useState('')

    const login = (form) => {
        auth.signInWithEmailAndPassword(form.email, form.password)
            .then((user) => {
                window.sessionStorage.setItem('userEmail', auth.currentUser.email)
                window.sessionStorage.setItem('userToken', auth.currentUser.refreshToken)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setErrorMessage(errorMessage)
                console.log(errorCode)
                console.log(errorMessage)
            });
    }

    const register = (form) => {
        console.log(form)
        auth.createUserWithEmailAndPassword(form.email, form.password)
            .then((user) => {
                window.sessionStorage.setItem('userEmail', auth.currentUser.email)
                window.sessionStorage.setItem('userToken', auth.currentUser.refreshToken)
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                setErrorMessage(errorMessage)
                console.log(errorCode)
                console.log(errorMessage)
            });
    }

    const signOut = () => {
        auth.signOut().then(function () {
            window.sessionStorage.removeItem('userEmail')
            window.sessionStorage.removeItem('userToken')
            console.log('singout')
        }).catch(function (error) {
            console.log(error)
        });
    }

    const isLogged = () => {
        if (auth.currentUser) {
            return true
        } else {
            return false
        }

    }

    const getCurrentUser = () =>{
        return auth.currentUser.email
    }

    return {
        login,
        register,
        signOut,
        isLogged,
        getCurrentUser,
        errorMessage,
        setErrorMessage
    }
}
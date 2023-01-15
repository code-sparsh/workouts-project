import { useState } from "react";
import {useAuthContext} from '../hooks/useAuthContext'

export const useLogin = (email,password) => {

    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    
    const { dispatch } = useAuthContext();

    const login = async (email,password) => {
        setError(null)
        setIsLoading(true)

        const response = await fetch('/api/user/login', {
            method: "POST",
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify({email,password}) 
        })

        const json = await response.json()

        if(!response.ok) {
            setIsLoading(false)
            setError(json.error)
            console.log("json.error")
        }

        if(response.ok) {
            console.log("lol")
            // save the user token in the local storage
            localStorage.setItem('user', JSON.stringify(json))

            // update the UserContext
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)

        }

    }

    return {login, isLoading, error}

}
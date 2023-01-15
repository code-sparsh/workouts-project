import {createContext, useReducer, useEffect} from 'react'
import { useLogin } from '../hooks/useLogin';

export const AuthContext = createContext();

export const authReducer = (state, action) => {

    switch(action.type) {
        case 'LOGIN':
            return { user: action.payload }

        case 'LOGOUT':
            return { user: null}

        default: 
            return state
    }

}

export const AuthContextProvider = ({children}) => {

    const user = JSON.parse(localStorage.getItem('user')) || null;
    const [state, dispatch] = useReducer(authReducer, {
        user: user
    })  

    console.log("AuthState: ", state);

    return (
        <AuthContext.Provider value = {{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}
import React, { useState, createContext, useContext } from "react";
import { Navigate } from "react-router-dom";

const AuthContext = createContext();

function useAuth() {
    const [authed, setAuthed] = useState(!!localStorage.getItem('token'));


    return {
        authed,
        login(token) {
            return new Promise(resolve => {
                setAuthed(true);
                resolve();
            })
        },
        logout() {
            return new Promise(resolve => {
                setAuthed(false);
                localStorage.clear();
                resolve()
            })
        }
    }


}

export function AuthProvider({ children }) {
    const auth = useAuth();
    return <AuthContext.Provider value={auth}>{ children }</AuthContext.Provider>
}

export default function AuthConsumer() {
    return useContext(AuthContext);
}

export function RequireAuth({ children }) {
    const { authed } = AuthConsumer();
    return authed === true ? (
        children
    ) : (
        <Navigate to={'/login'} replace />
    )
}
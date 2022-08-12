import React from 'react'
import {useRoutes, BrowserRouter as Router, Navigate, Outlet} from 'react-router-dom';
import routerOptions from './router'
import { AuthProvider } from "./router/auth";

// Styles
import './assets/styles/index.less'

const App = () => {
    return (
        <AuthProvider>
            {useRoutes(routerOptions)}
        </AuthProvider>
    )
}

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    )
}

export default AppWrapper
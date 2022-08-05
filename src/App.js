import React from 'react'
import {useRoutes, BrowserRouter as Router} from 'react-router-dom';

import Home from './pages/home';
import Login from './pages/login';

// Styles
import './common/styles/index.less'

const App = () => {
    return useRoutes([
        {path: '/', element: <Home/>},
        {path: '/login', element: <Login/>},
        {path: '/home', element: <Home/>},
    ])
}

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    )
}

export default AppWrapper
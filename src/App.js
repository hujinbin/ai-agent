import React from 'react'
import {useRoutes, BrowserRouter as Router} from 'react-router-dom';
import routerOptions from './router'

// Styles
import './assets/styles/index.less'

const App = () => {
    return useRoutes(routerOptions)
}

const AppWrapper = () => {
    return (
        <Router>
            <App />
        </Router>
    )
}

export default AppWrapper
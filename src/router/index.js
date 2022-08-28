import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';

import Layout from '../layouts/common-layout';

import Login from '../pages/login'
import Register from '../pages/register'
import NotFound from '../pages/not-found';

import { RequireAuth } from "./auth";
import {Navigate} from "react-router-dom";



const Dashboard = lazy(() => import('../pages/dashboard'));

const User = lazy(() => import('../pages/user'));

const InterfaceList = lazy(() => import('../pages/data/interface'));
const ErrorList = lazy(() => import('../pages/data/error'));

const AlarmSetting = lazy(() => import('../pages/alarm/setting'));

const SystemSetting = lazy(() => import('../pages/system/setting'));



const lazyload = (children) => {
    return <Suspense fallback={<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    }}>
        <Spin/>
    </div>}>
        { children }
    </Suspense>
}


const routerOptions = [
    {
        path: '/',
        element: <RequireAuth>
            <Layout/>
        </RequireAuth>,
        children: [
            {
                index: true,
                element: <Navigate to={'/dashboard'}/>
            },
            {
                path: 'dashboard',
                name: 'dashboard',
                element: lazyload(<Dashboard/>),
            },
            {
                path: 'user',
                name: 'user',
                element: lazyload(<User/>),
            },
            {
                path: 'data-interface-list',
                name: 'data-interface-list',
                element: lazyload(<InterfaceList />)
            },
            {
                path: 'data-error-list',
                name: 'data-error-list',
                element: lazyload(<ErrorList />)
            },
            {
                path: 'alarm-setting',
                name: 'alarm-setting',
                element: lazyload(<AlarmSetting />)
            },
            {
                path: 'system-setting',
                name: 'system-setting',
                element: lazyload(<SystemSetting />)
            },
        ],
    },
    {
        path: '/login',
        element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '*',
        element: <NotFound/>,
    }
]

export default routerOptions;
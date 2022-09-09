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

const PageErrorList = lazy(() => import('../pages/data/page-error'));
const InterfaceErrorList = lazy(() => import('../pages/data/interface-error'));
const StableList = lazy(() => import('../pages/data/stable'));
const PerformanceList = lazy(() => import('../pages/data/performance'));

const AlarmSetting = lazy(() => import('../pages/alarm/setting'));

const SystemSetting = lazy(() => import('../pages/system/setting'));

const AccessKey = lazy(() => import('../pages/access-way'));



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
                path: 'data-interface-error-list',
                name: 'data-interface-error-list',
                element: lazyload(<InterfaceErrorList />)
            },
            {
                path: 'data-page-stable-list',
                name: 'data-page-stable-list',
                element: lazyload(<StableList />)
            },
            {
                path: 'data-performance-list',
                name: 'data-performance-list',
                element: lazyload(<PerformanceList />)
            },
            {
                path: 'data-page-error-list',
                name: 'data-page-error-list',
                element: lazyload(<PageErrorList />)
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
            {
                path: 'access',
                name: 'access',
                element: lazyload(<AccessKey />)
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
import React, { lazy, Suspense } from 'react';

import Layout from '../layouts/common-layout';

import Login from '../pages/login'
import NotFound from '../pages/not-found';

import { RequireAuth } from "./auth";



const Dashboard = lazy(() => import('../pages/dashboard'));

const User = lazy(() => import('../pages/user'));

const DomainList = lazy(() => import('../pages/data/domain'));
const InterfaceList = lazy(() => import('../pages/data/interface'));
const ErrorList = lazy(() => import('../pages/data/error'));

const AlarmList = lazy(() => import('../pages/alarm/list'));
const AlarmSetting = lazy(() => import('../pages/alarm/setting'));

const SystemSetting = lazy(() => import('../pages/system/setting'));



const lazyload = (children) => {
    return <Suspense fallback={<h1>Loading ...</h1>}>
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
                path: 'data-domain-list',
                name: 'data-domain-list',
                element: lazyload(<DomainList />)
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
                path: 'alarm-list',
                name: 'alarm-list',
                element: lazyload(<AlarmList />)
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
        path: '*',
        element: <NotFound/>,
    }
]

export default routerOptions;
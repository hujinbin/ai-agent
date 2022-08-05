import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux';
import store from "./store";
import {ConfigProvider} from "antd";
import zhCN from 'antd/es/locale/zh_CN';

const antdConfig = {
    locale: zhCN,
}

const root = createRoot(document.getElementById('root'))
root.render(
    <ConfigProvider {...antdConfig}>
        <Provider store={store}>
            <App/>
        </Provider>
    </ConfigProvider>,)
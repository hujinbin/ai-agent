import {Fragment, useEffect} from "react";
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom';
import Header from "../../components/header";
import Sider from '../../components/sider';

const { Content, Footer } = Layout;

function CommonLayout() {
    return <Fragment>
        <Layout className="common-layout-wrapper">
            <Sider />
            <Layout className="common-layout-content">
                <Header></Header>
                <Content className="common-layout-container">
                    <Outlet/>
                </Content>
                <Footer className="common-layout-footer">
                    Monitor App ©2022 Created by HJB & YDC
                </Footer>
            </Layout>
        </Layout>
    </Fragment>
}

export default CommonLayout;
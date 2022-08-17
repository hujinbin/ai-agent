import {Menu} from 'antd';
import menus from './menus';
import React, {useEffect, useState} from 'react';
import Logo from './components/logo';
import {MenuFoldOutlined, MenuUnfoldOutlined} from '@ant-design/icons';
import {matchRoutes, useLocation, useNavigate} from 'react-router-dom'
import routers from '../../router';

const Sider = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [defaultSelectedKeys, setDefaultSelectedKeys] = useState([]);
    const [defaultOpenKeys, setDefaultOpenKeys] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);
    const [collapsed, setCollapsed] = useState(false);
    const [isInit, setIsInit] = useState(false)

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        if (!collapsed) {
            setOpenKeys([]);
        } else {
            setOpenKeys(handleGetOpenKeys())
        }
    }

    const handleChangeSubMenu = (openKeys) => {
        setOpenKeys(openKeys);
    }


    const handleNavigate = ({ key, selectedKeys }) => {
        navigate(`/${key}`)
        setDefaultSelectedKeys(selectedKeys);
    }

    const handleGetOpenKeys = () => {
        console.log(location);
        const currentPath = location.pathname.slice(1);
        return [currentPath.split('-')[0]];
    }

    useEffect(() => {
        const routes = matchRoutes(routers, location.pathname);
        const pathArr = [];
        if (routes !== null) {
            const currentRoute = routes.find(item => item.pathname === location.pathname);
            const subPathName = currentRoute.route.name ? currentRoute.route.name.split('-')[0] : null;
            pathArr.push(currentRoute.route.name)
            if (subPathName && !pathArr.includes(subPathName)) {
                pathArr.push(subPathName)
            }
        }
        setDefaultSelectedKeys(pathArr)
        setDefaultOpenKeys(pathArr);
        setOpenKeys(pathArr)
        setIsInit(true);
    }, [location.pathname])
    if(!isInit) {
        return null;
    }
    return (
        <div className={`common-layout-sider ${collapsed ? 'is-collapsed' : null}`}>
            <Logo />
            <Menu
                openKeys={openKeys}
                defaultSelectedKeys={defaultSelectedKeys}
                defaultOpenKeys={defaultOpenKeys}
                mode="inline"
                theme="light"
                inlineCollapsed={collapsed}
                items={menus}
                className={'menu-list'}
                onSelect={handleNavigate}
                onOpenChange={handleChangeSubMenu}
            ></Menu>
            <span
                className={`collapsed-btn ${collapsed ? 'is-collapsed' : null}`}
                onClick={toggleCollapsed}>
                { collapsed ?  <MenuUnfoldOutlined  className="icon"/> : <MenuFoldOutlined  className="icon"/> }
            </span>
        </div>
    )
}

export default Sider;
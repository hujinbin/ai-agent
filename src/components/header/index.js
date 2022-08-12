import React, { Component } from "react";
import HeaderDropdown from "./components/headerDropdown";
import Auth from '../../router/auth';
import { useNavigate } from "react-router-dom";
import './index.less';

function Header() {
    const { logout } = Auth();
    const navigate = useNavigate();
    const onClick = (event) => {
        const { key } = event;
        switch (key) {
            case 'logout':
                logout();
                navigate('/login');
                break;
            default:
                break;
        }
    }
    return (
        <div className="header-wrapper">
            <HeaderDropdown
                className="header-wrapper-right"
                onClick={onClick}
            />
        </div>
    )
}

export default Header
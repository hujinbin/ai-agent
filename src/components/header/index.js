import React, { Component } from "react";
import HeaderDropdown from "./components/headerDropdown";
import './index.less';

class Header extends Component {
    render() {
        return (
            <div className="header-wrapper">
                <HeaderDropdown className="header-wrapper-right"/>
            </div>
        )
    }
}

export default Header
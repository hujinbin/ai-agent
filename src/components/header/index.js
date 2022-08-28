import React, {useState} from "react";
import HeaderDropdown from "./components/HeaderDropdown";
import HeaderDomainList from "./components/HeaderDomainList";
import ChangePwdModal from "./components/ChangePwdModal";
import Auth from '../../router/auth';
import { useNavigate } from "react-router-dom";
import './index.less';

function Header() {
    const { logout } = Auth();
    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const handleLogout = () => {
        logout();
        navigate('/login');
    }
    const handleChangePwd = () => {
        setVisible(true);
    }
    return (
        <div className="header-wrapper">
            <HeaderDomainList/>
            <HeaderDropdown
                className="header-wrapper-right"
                handleLogout={handleLogout}
                handleChangePwd={handleChangePwd}
            />
            <ChangePwdModal visible={visible} setVisible={setVisible}/>
        </div>
    )
}

export default Header
import { Button, Result } from 'antd';
import { useNavigate } from "react-router-dom";
import React from 'react';


function NotFoundPage(props) {
    const navigate = useNavigate();

    const backToHome = () => {
        navigate('/dashboard')
    }

    return <Result
        status="404"
        title="404"
        subTitle="对不起，暂未找到你想要的页面"
        extra={<Button type="primary" onClick={backToHome}>回到首页</Button>}
    />
};

export default NotFoundPage;
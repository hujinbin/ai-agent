import {Col, Row, message} from "antd";
import RegisterForm from "./components/RegisterForm";
import React from "react";
import {fetchUserRegister} from "../../services/loginServices";
import { useNavigate } from "react-router-dom";
import './styles/index.less'

function RegisterIndex() {
    const navigate = useNavigate();
    const onFinish = (data) => {
        const { username, password, code } = data;
        const params = {
            username,
            password,
            code
        }
        fetchUserRegister(params).then(async res => {
            if (res.data.code === 200) {
                message.success('注册成功!');
                navigate('/login');
            }
        });
    }

    return (
        <Row className={'register-wrapper'}>
            <Col span={6} offset={9}>
                <h4 className={'title'}>Monitor App</h4>
                <RegisterForm
                    onFinish={onFinish}
                />
            </Col>
        </Row>
    )
}

export default RegisterIndex
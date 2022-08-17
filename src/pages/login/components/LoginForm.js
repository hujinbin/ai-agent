import React from 'react';
import { Form , Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import pattern from "../../../utils/validator";

const rulesObj = {
    username: [
        { required: true, message: '请输入用户名' },
        pattern('username')
    ],
    password: [
        { required: true, message: '请输入密码' },
        pattern('password')
    ],
}


function LoginForm(props) {
    return (
        <Form
            name={'login-form'}
            onFinish={props.onFinish}
            autoComplete="off"
        >
            <Form.Item
                name={'username'}
                rules={rulesObj.username}
            >
                <Input prefix={<UserOutlined />} placeholder={'用户名'}/>
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={rulesObj.password}
            >
                <Input.Password prefix={<LockOutlined/>} placeholder={'密码'}/>
            </Form.Item>
            <Form.Item>
                <Button
                    type={'primary'}
                    htmlType={'submit'}
                    className={'login-btn'}
                >
                    登录
                </Button>
            </Form.Item>
        </Form>
    )
}

export default LoginForm

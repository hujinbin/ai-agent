import {Form, Input, Button, Col, Row} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import pattern from "../../../utils/validator";
import {useNavigate} from "react-router-dom";

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
    const navigate = useNavigate();

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
                <Row>
                    <Col span={11}>
                        <Button
                            onClick={() => navigate('/register')}
                            style={{ width: '100%' }}
                        >注 册</Button>
                    </Col>
                    <Col span={11} offset={2}>
                        <Button
                            type={'primary'}
                            htmlType={'submit'}
                            style={{ width: '100%' }}
                        >
                            登 录
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    )
}

export default LoginForm

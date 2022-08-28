import {Button, Form, Input, Row, Col} from "antd";
import {LockOutlined, UserOutlined} from "@ant-design/icons";
import CodeModal from './CodeModal';
import {useState} from "react";
import pattern from "../../../utils/validator";
import { useNavigate } from "react-router-dom";

const rulesObj = {
    username: [
        { required: true, message: '请输入用户名' },
        pattern('username')
    ],
    password: [
        { required: true, message: '请输入密码' },
        pattern('password')
    ],
    code: [
        { required: true, message: '请输入验证码' },
    ]
}


function RegisterForm(props) {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const {
        onFinish
    } = props;


    const handleCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <Form
            form={form}
            name={'register-form'}
            onFinish={onFinish}
            autoComplete={'off'}
        >
            <Form.Item
                name={'username'}
            >
                <Input prefix={<UserOutlined />} placeholder={'用户名'}/>
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={rulesObj.password}
            >
                <Input.Password prefix={<LockOutlined/>} placeholder={'密码'}/>
            </Form.Item>
            <Form.Item
                name={'checkPassword'}
                rules={[
                    { required: true, message: '请再次输入密码' },
                    ({ getFieldValue }) => ({
                        validator(rule, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve()
                            }
                            return Promise.reject('两次密码输入不一致')
                        }
                    })
                ]}
            >
                <Input.Password prefix={<LockOutlined/>} placeholder={'再次输入密码'}/>
            </Form.Item>
            <Form.Item
                name={'code'}
                rules={rulesObj.code}
            >
                <Row>
                    <Col span={16}>
                        <Input placeholder={'请输入验证码'}/>
                    </Col>
                    <Col span={7} offset={1}>
                        <Button type={'primary'} onClick={() => setIsModalVisible(true)}>获取验证码</Button>

                        <CodeModal isModalVisible={isModalVisible} handleCancel={handleCancel}/>
                    </Col>
                </Row>

            </Form.Item>
            <Form.Item>
                <Row>
                    <Col span={11}>
                        <Button
                            onClick={() => navigate('/login')}
                            style={{ width: '100%' }}
                        >登 录</Button>
                    </Col>
                    <Col span={11} offset={2}>
                        <Button
                            type={'primary'}
                            htmlType={'submit'}
                            style={{ width: '100%' }}
                        >
                            注 册
                        </Button>
                    </Col>
                </Row>
            </Form.Item>
        </Form>
    )
}

export default RegisterForm;
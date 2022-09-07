import pattern from "../../../utils/validator";
import {Button, Form, Input,} from "antd";
import {LockOutlined} from "@ant-design/icons";

const rulesObj = {
    oldPassword: [
        { required: true, message: '请输入旧密码' },
        pattern('password')
    ],
    password: [
        { required: true, message: '请输入新密码' },
        pattern('password')
    ],
}

function ChangePwdForm(props) {
    const { onFinish } = props;
    const [form] = Form.useForm();
    return (
        <Form
            form={form}
            name={'change-pwd-form'}
            onFinish={onFinish}
            autoComplete={'off'}
        >
            <Form.Item
                name={'oldPassword'}
                rules={rulesObj.oldPassword}
            >
                <Input.Password prefix={<LockOutlined/>} placeholder={'请输入旧密码'}/>
            </Form.Item>
            <Form.Item
                name={'password'}
                rules={rulesObj.password}
            >
                <Input.Password prefix={<LockOutlined/>} placeholder={'请输入新密码'}/>
            </Form.Item>
            <Form.Item
                name={'checkPassword'}
                rules={[
                    { required: true, message: '请再次输入新密码' },
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
                <Input.Password prefix={<LockOutlined/>} placeholder={'再次输入新密码'}/>
            </Form.Item>
            <Form.Item>
                <Button
                    style={{ float: 'right' }}
                    type={'primary'}
                    htmlType={'submit'}
                >确定修改</Button>
            </Form.Item>
        </Form>
    )
}

export default ChangePwdForm
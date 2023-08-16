import {Form, Modal, Radio, Switch, Input, Button,Select} from "antd";
import pattern from "../../../../utils/validator";

const { TextArea } = Input;
const { Option } = Select;

const rulesObj = {
    Phone: [
        pattern('phone')
    ],
    Secret: [
        { required: true, message: '请填写Secret' }
    ],
    AccessToken: [
        { required: true, message: '请填写AccessToken' }
    ],
}

function alarmEditModal(props) {
    const {
        isModalVisible,
        onCancel,
        initialValues,
        onFinish,
        submitBtnLoading
    } = props;

    const formItemLayout = {
        labelCol: {
            span: 6,
        },
        wrapperCol: {
            span: 14,
        },
    };

    return (
        <Modal
            title={'编辑告警设置'}
            visible={isModalVisible}
            destroyOnClose={true}
            footer={null}
            onCancel={onCancel}
        >
            <Form
                name={'alarm-form'}
                initialValues={initialValues}
                {...formItemLayout}
                onFinish={onFinish}
            >
                <Form.Item label={'告警状态'} name={'OpenAlarm'} valuePropName={'checked'}>
                    <Switch/>
                </Form.Item>
                <Form.Item label={'告警域名'} name={'DomainIds'} valuePropName={'checked'}>
                <Select
            // value={props.currentDomain}
            style={{ width: '200px', marginRight: '20px' }}
            mode="multiple"
            // onChange={handleChangeDomain}
        >
            {
                props.domainList.map((domain, index) => (
                    <Option key={index} value={String(domain.Id)}>{ domain.Domain }</Option>
            )   )
            }
        </Select>
                </Form.Item>
                <Form.Item label={'是否通知所有人'} name={'AtAll'}>
                    <Radio.Group>
                        <Radio value={true}>是</Radio>
                        <Radio value={false}>否</Radio>
                    </Radio.Group>
                </Form.Item>
                {/*TODO 暂时注释，后续修改*/}
                {/*<Form.Item label={'电话'} name={'Phone'} rules={rulesObj.Phone}>*/}
                {/*    <Input/>*/}
                {/*</Form.Item>*/}
                <Form.Item label={'Secret'} name={'Secret'} rules={rulesObj.Secret}>
                    <TextArea/>
                </Form.Item>
                <Form.Item label={'AccessToken'} name={'AccessToken'} rules={rulesObj.AccessToken}>
                    <TextArea/>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        span: 12,
                        offset: 13,
                    }}
                >
                    <Button style={{ marginRight: '12px' }} onClick={onCancel}>取 消</Button>
                    <Button type={'primary'} htmlType={'submit'} loading={submitBtnLoading}>确 定</Button>
                </Form.Item>
            </Form>

        </Modal>
    )
}

export default alarmEditModal;

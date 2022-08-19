import ChangePwdForm from "./ChangePwdForm";
import { Modal, message } from "antd";
import {fetchUserChangePwd} from "../../../services/userServices";
import Auth from "../../../router/auth";
import { useNavigate } from "react-router-dom";

function ChangePwdModal(props) {
    const { visible, setVisible } = props;
    const { logout } = Auth();
    const navigator = useNavigate();
    const onFinish = (data) => {
        const { oldPassword, password } = data;
        const params = {
            oldPassword, password
        }
        fetchUserChangePwd(params).then(res => {
            if (res.data.code === 200) {
                message.success('密码修改成功！请重新登陆！');
                logout();
                navigator('/login');
            }
        })
    }
    return (
        <Modal
            title={'修改密码'}
            visible={visible}
            destroyOnClose={true}
            footer={null}
            onCancel={() => setVisible(false)}
        >
            <ChangePwdForm onFinish={onFinish}/>
        </Modal>
    )
}

export default ChangePwdModal
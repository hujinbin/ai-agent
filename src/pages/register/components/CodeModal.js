import {Modal} from "antd";
import img from './img.png';

function CodeModal(props) {
    const { isModalVisible, handleCancel } = props;
    return (
        <Modal
            title="获取验证码"
            footer={null}
            visible={isModalVisible}
            onCancel={handleCancel}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h2 style={{ fontWeight: 'bold' }}>扫码关注</h2>
                <img src={img} alt=""/>
            </div>
        </Modal>
    )
}


export default CodeModal;
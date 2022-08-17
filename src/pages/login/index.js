import React from 'react';
import { Row, Col } from 'antd';
import { withRouter } from "../../router/withRouter";
import LoginForm from "./components/LoginForm";
import { fetchLogin } from "../../services/loginServices";
import { connect } from "react-redux";
import { actionCreators } from "../../store/global";
import './styles/index.less'
import Auth from "../../router/auth";

function LoginPage(props) {
    const { login } = Auth();
    const onFinish = (data) => {
        fetchLogin(data).then(res => {
            const userLoginInfo = res.data.data;
            Object.keys(userLoginInfo).forEach(key => {
                localStorage.setItem(key, userLoginInfo[key]);
            })
            props.setToken(res.data.data.token);
            login(res.data.data.token);
            props.navigate('/dashboard');
        });
    }
    return (
        <Row className={'login-wrapper'}>
            <Col span={6} offset={9}>
                <h4 className={'title'}>Monitor App</h4>
                <LoginForm
                    onFinish={onFinish}
                />
            </Col>
        </Row>
    )
}

const mapStateToProps = (state) => ({
    token: state.getIn(['global', 'token'])
})

const mapDispatchToProps = (dispatch) => ({
    setToken(data) {
        const action = actionCreators.setToken(data)
        dispatch(action);
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage))

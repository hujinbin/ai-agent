import React from 'react';
import { Row, Col } from "antd";
import { withRouter } from "../../router/withRouter";
import LoginForm from "./components/LoginForm";
import { fetchLogin } from "../../services/loginServices";
import { fetchDomainList } from "../../services/dataServices";
import { connect } from "react-redux";
import { actionCreators } from "../../store/global";
import './styles/index.less'
import Auth from "../../router/auth";
import {List} from "immutable";
import Guide from "../../components/guide/index";

function LoginPage(props) {
    const { login } = Auth();

    const handleGetDomainList = async () => {
        const res = await fetchDomainList();
        props.setDomainList(List(res.data.data.list) || List([]));
        if (props.domainList.size > 0) {
            props.setCurrentDomain(props.domainList.get(0).Id)
        }
    }

    const onFinish = (data) => {
        console.log(data)
        fetchLogin(data).then(async res => {
            const userLoginInfo = res.data.data;
            Object.keys(userLoginInfo).forEach(key => {
                localStorage.setItem(key, userLoginInfo[key]);
            })
            props.setToken(res.data.data.token);
            login(res.data.data.token);
            await handleGetDomainList();
            props.navigate('/dashboard');
        });
    }
    return (
      <Row className={"login-wrapper"}>
        <Col span={6} offset={9}>
          <h4 className={"title"}>Monitor App</h4>
          <LoginForm onFinish={onFinish} />
          <Guide></Guide>
        </Col>
      </Row>
    );
}

const mapStateToProps = (state) => ({
    token: state.getIn(['global', 'token']),
    domainList: state.getIn(['global', 'domainList']),
})

const mapDispatchToProps = (dispatch) => ({
    setToken(data) {
        const action = actionCreators.setToken(data)
        dispatch(action);
    },

    setDomainList(data) {
        const action = actionCreators.setDomainList(data)
        dispatch(action);
    },

    setCurrentDomain(data) {
        const action = actionCreators.setCurrentDomain(data)
        dispatch(action);
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(LoginPage))

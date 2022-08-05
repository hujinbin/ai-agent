import React from 'react';
import Login from '../../components/login';
import {connect} from "react-redux";
import {actionCreators} from "../../components/login/store";
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';

function LoginPage(props) {
    const navigate = useNavigate();

    const gotoHome = () => {
        navigate('/home')
    }

    return (
        <div>
            <Login />
            <p>login props: {props.myData}</p>
            <Button onClick={() => {props.getData('123456')}}>修改</Button>
            <Button onClick={() => gotoHome()}>Go Home</Button>
        </div>
    )
}

const mapStateToProps = (state) => ({
    myData: state.getIn(['login', 'myData'])
})

const mapDispatchToProps = (dispatch) => ({
    getData(data) {
        const action = actionCreators.getData(data)
        dispatch(action)
    }
})



export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)
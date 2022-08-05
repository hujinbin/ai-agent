import React, {Component} from 'react';
import Login from '../../components/login';
import {connect} from "react-redux";
import {actionCreators} from "../../components/login/store";


class LoginPage extends Component {
    render() {
        return (
            <div>
                <Login></Login>
                <p>login props: {this.props.myData}</p>
                <button onClick={() => {this.props.getData('123456')}}>修改</button>
                <button onClick={() => this.gotoHome()}>Go Home</button>
            </div>
        )
    }

    gotoHome() {
        console.log(this.props);
    }
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
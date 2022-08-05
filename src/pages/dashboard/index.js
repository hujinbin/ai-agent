import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Dashboard extends Component {
    render() {
        return (
            <div>
                <h1>Dashboard Page</h1>
                <Link to='/login'>123</Link>
            </div>
        )
    }
}
export default Dashboard
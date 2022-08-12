import React, { useState, useEffect } from 'react';
import UserTable from "./components/userTable";
import { fetchUserList } from "../../services/userServices";

function UserList(props) {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetchUserList().then(res => {
            console.log(res);
        });
    },[])

    return (
        <UserTable />
    )
}

export default UserList;
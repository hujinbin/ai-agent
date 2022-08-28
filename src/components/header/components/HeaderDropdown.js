import {Popover, Avatar, Button, Row, Col} from 'antd';
import {UserOutlined} from '@ant-design/icons'
import {useEffect, useState} from "react";
import {fetchUserInfo} from "../../../services/userServices";
import '../styles/index.less'

function HeaderDropdown(props) {
    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        fetchUserInfo().then(res => {
            console.log(res);
            setUserInfo(res.data.data);
        })
    }, [])
    return (
        <Popover
            content={
                <>
                    <div className={'description-list'}>
                        <div className={'description-item'}>身份：{ userInfo.Role === 100 ? '超级管理员' : '普通用户' }</div>
                        <div className={'description-item'}>用户ID：{ userInfo.Id }</div>
                        <div className={'description-item'}>登录次数：{ userInfo.LoginNum }</div>
                    </div>
                    <Row>
                        <Col span={10}>
                            <Button className={'btn'} type={'link'} onClick={props.handleChangePwd}>修改密码</Button>
                        </Col>
                        <Col span={10} offset={2}>
                            <Button className={'btn'} type={'link'} onClick={props.handleLogout}>登 出</Button>
                        </Col>
                    </Row>

                </>
            }
            title={
                <h4 className={'title'}>你好，{userInfo.Username}</h4>
            }
        >
            <Avatar icon={<UserOutlined/>}/>
        </Popover>
    )
}

export default HeaderDropdown;
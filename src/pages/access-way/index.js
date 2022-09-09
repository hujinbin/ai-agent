import AccessWay1 from '../../documents/AccessWay-1.md';
import AccessWay2 from '../../documents/AccessWay-2.md';
import {useEffect, useState} from "react";
import {fetchUserInfo} from "../../services/userServices";
import Markdown from "../../components/markdown";
import SecretBox from "./components/SecretBox";
import UserInfoBox from "./components/UserInfoBox";
import { Rate } from "antd";

import './styles/index.less';

function AccessWay(props) {
    const [accessWay1, setAccessWay1] = useState('');
    const [accessWay2, setAccessWay2] = useState('');
    const [userInfo, setUserInfo] = useState({});

    const handleReplaceSecret = (str, secret) => {
        return str.replace(/\{secret\}/g, secret);
    }

    const handleGetAccessKey1 = (secret) => {
        fetch(AccessWay1).then(async res => {
            const result = handleReplaceSecret(await res.text(), secret);
            setAccessWay1(result);
        })
    }

    const handleGetAccessKey2 = (secret) => {
        fetch(AccessWay2).then(async res => {
            const result = handleReplaceSecret(await res.text(), secret);
            setAccessWay2(result);
        })
    }

    useEffect(() => {
        fetchUserInfo().then(res => {
            setUserInfo(res.data.data);
            handleGetAccessKey1(res.data.data.ApiKey);
            handleGetAccessKey2(res.data.data.ApiKey);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div>
            <h3 className={'title'}>基本信息</h3>
            <SecretBox secret={userInfo.ApiKey}/>

            <h3 className={'title'}>用户信息</h3>
            <UserInfoBox userInfo={userInfo}/>

            <h3 className={'title'}>使用方法</h3>
            <h4 className={'sub-title'}>
                <span className={'content'}>方式一（推荐等级：<Rate disabled={true} defaultValue={5}></Rate>）</span>
            </h4>
            <Markdown text={accessWay1} id={'accessWay1'}/>

            <h4 className={'sub-title'}>
                <span className={'content'}>方式二（推荐等级：<Rate disabled={true} defaultValue={3}></Rate>）</span>
            </h4>
            <Markdown text={accessWay2} id={'accessWay2'}/>
        </div>
    )
}

export default AccessWay;
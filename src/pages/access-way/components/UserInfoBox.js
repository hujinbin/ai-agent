function UserInfoBox(props) {
    const { Username, LoginNum, Id } = props.userInfo;
    return (
        <div className={'box-wrapper'}>
            <div className={'info-item'}>
                <span className={'label'}>您的姓名：</span>
                <span className={'content'}>{ Username }</span>
            </div>
            <div className={'info-item'}>
                <span className={'label'}>登录次数：</span>
                <span className={'content'}>{ LoginNum }</span>
            </div>
            <div className={'info-item'}>
                <span className={'label'}>用户ID：</span>
                <span className={'content'}>{ Id }</span>
            </div>
        </div>
    )
}

export default UserInfoBox;
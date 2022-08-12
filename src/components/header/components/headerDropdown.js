import {Dropdown, Avatar, Menu} from 'antd';
import {UserOutlined} from '@ant-design/icons'

function HeaderDropdown(props) {
    return (
        <>
            <Dropdown
                overlay={
                    <Menu
                        items={[
                            {
                                key: 'logout',
                                label: (<span>
                    登 出
                </span>)
                            }
                        ]}
                        onClick={props.onClick}
                    ></Menu>
                }
                placement="bottom"
                on
            >
                <Avatar icon={<UserOutlined/>}/>
            </Dropdown>
        </>
    )
}

export default HeaderDropdown;
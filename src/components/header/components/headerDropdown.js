import { Dropdown, Avatar, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons'

const menu = (
    <Menu
        items={[
            {
                key: 'logout',
                label: (<span>
                    登 出
                </span>)
            }
        ]}
    ></Menu>
)
const HeaderDropdown = () => {
    return (
        <>
            <Dropdown
                overlay={menu}
                placement="bottom"
            >
                <Avatar icon={<UserOutlined />} />
            </Dropdown>
        </>
    )
}

export default HeaderDropdown;
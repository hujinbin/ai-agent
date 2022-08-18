import { Select } from "antd";
import { connect } from "react-redux";
import { actionCreators } from '../../../store/global'
import {useEffect} from "react";
import AuthConsumer from "../../../router/auth";
import {fetchDomainList} from "../../../services/dataServices";

const { Option } = Select;

function HeaderDomainList(props) {
    const { authed } = AuthConsumer();

    const handleChangeDomain = (value) => {
        props.setCurrentDomain(value);
        setTimeout(() => {
            window.reload();
        }, 500)
    }

    useEffect(() => {
        if (authed && props.domainList.size === 0) {
            fetchDomainList().then(res => {
                const list = res.data.data.list || [];
                props.setDomainList(list);
                if (list.length > 0) {
                    props.setCurrentDomain(list[0].Id)
                }
            })
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Select
            value={props.currentDomain}
            style={{ width: '200px', marginRight: '20px' }}
            onChange={handleChangeDomain}
        >
            {
                props.domainList.map((domain, index) => (
                    <Option key={index} value={domain.Id}>{ domain.Domain }</Option>
            )   )
            }
        </Select>
    )
}


const mapStateToProps = (state) => ({
    currentDomain: state.getIn(['global', 'currentDomain']),
    domainList: state.getIn(['global', 'domainList']),
})

const mapDispatchToProps = (dispatch) => ({
    setCurrentDomain(data) {
        const action = actionCreators.setCurrentDomain(data);
        dispatch(action)
    },

    setDomainList(data) {
        const action = actionCreators.setDomainList(data);
        dispatch(action)
    }
})



export default connect(mapStateToProps, mapDispatchToProps)(HeaderDomainList);
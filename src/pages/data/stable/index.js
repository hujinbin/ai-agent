import {fetchWebStabilityList} from '../../../services/dataServices';
import {Row, Col, Pagination, Empty} from 'antd';
import StableCard from "./components/stableCard";
import './styles/index.less';
import {useEffect, useState} from "react";

function DataStable() {
    const [current, setCurrent] = useState(1);
    const [tableList, setTableList] = useState([]);
    const [total, setTotal] = useState(0);

    const handleSearchList = () => {
        const params = {
            pageSize: 12,
            pageNum: current,
        }
        fetchWebStabilityList(params).then(res => {
            setTableList(res.data.data.list || []);
            setTotal(res.data.data.total || 0);
        })
    }

    const onChange = (page) => {
        setCurrent(page);
        handleSearchList();
    }

    useEffect(() => {
        handleSearchList();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            { tableList.length !== 0 ? <>
                <Row gutter={[20, 20]}>
                    {tableList.map((item, index) => (
                        <Col key={index} span={6}>
                            <StableCard data={item}></StableCard>
                        </Col>)
                    )}
                </Row>

                <Pagination
                    pageSize={12}
                    current={current}
                    total={total}
                    defaultCurrent={1}
                    defaultPageSize={12}
                    onChange={onChange}
                />
            </> : <div className={'empty-wrapper'}>
                <Empty/>
            </div> }

        </>
    )
}


export default DataStable;
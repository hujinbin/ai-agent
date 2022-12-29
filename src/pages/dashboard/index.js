import Chart from '../../components/chart';
import {GridComponent, LegendComponent, TitleComponent, GraphicComponent} from "echarts/components";
import {BarChart} from "echarts/charts";
import {useEffect, useState} from "react";
import {fetchNetWorkErrorOverview, fetchStablerOverview, fetchWebStableOverview, fetchErrorStableOverview} from "../../services/dashboard";
import './styles/index.less';
import {message, Row, Col} from "antd";
import {STABLE_PAGE_TYPE} from "../../enums";

const DomainId = localStorage.getItem('currentDomain') || '';

const emptyOptions = {
    graphic: {
        elements: [
            {
                type: 'image',
                style: {
                    image: require('./styles/empty.png'),
                    width: 80,
                    height: 80,
                },
                left: 'center',
                top: 'center',
            },
            {
                type: 'text',
                style: {
                    text: '暂无数据',
                },
                left: 'center',
                top: '250px',
            }
        ]
    },
}

const getTopOptions = ({ titleText, data }) => {
    if (data.length === 0) {
        return {
            title: {
                text: titleText,
            },
            ...emptyOptions,
        }
    }
    return {
        title: {
            text: titleText,
        },
        grid: {
            left: '5px',
            bottom: 20,
        },
        xAxis: {
            type: 'value',
        },
        yAxis: {
            type: 'category',
            show: false,
            data: data.map(item => item.Pathname),
            triggerEvent: true,
            inverse: true,
        },
        series: [
            {
                data: data.map(item => item.Number),
                type: 'bar',
                barWidth:'10px',
                barGap:'20%',
                label: {
                    show: true,
                    formatter: function(params) {
                        const name = params.name.length > 60 ? params.name.slice(0, 60) + '...' : params.name;
                        const { dataIndex } = params;
                        const index = dataIndex + 1;
                        if (index === 1) {
                            return `{top1|Top 1} - {text| ${name}}`
                        } else if (index === 2) {
                            return `{top2|Top 2} - {text| ${name}}`
                        } else if (index === 3) {
                            return `{top3|Top 3} - {text| ${name}}`
                        } else {
                            return `Top ${index} - ${name}`;
                        }
                    },
                    color: '#000000',
                    position: [0, -15],
                    align: 'left',
                    rich: {
                        top1: {
                            color: '#f5222d',
                        },
                        top2: {
                            color: '#faad14',
                        },
                        top3: {
                            color: '#e3b14d',
                        },
                        text: {
                            color: '#000000'
                        }
                    }
                }
            }
        ]
    }
}

function Dashboard() {
    const [networkOptions, setNetworkOptions] = useState({});
    const [stableOptions, setStableOptions] = useState({});
    const [stableErrorOptions, setStableErrorOptions] = useState({});
    const [stableList, setStableList] = useState([]);

    const copy = async text => {
        if ('clipboard' in navigator) {
            message.success('复制成功！');
            return await navigator.clipboard.writeText(text);
        } else {
            message.success('复制成功！');
            return document.execCommand('copy', true, text);
        }
    }

    const handleClick = async params => {
        await copy(params.name)
    }

    const eventObj = {
        'click': handleClick,
    }

    const renderStableChart = () => {
        const stableType = STABLE_PAGE_TYPE.getList();
        fetchWebStableOverview({DomainId}).then(res => {
            const data = res.data.data || {};
            if (Object.keys(data).length > 0) {
                Object.keys(data).forEach(key => {
                    data[key] = data[key] ? data[key] : [];
                })
                stableType.forEach(item => {
                    item.list = data[item.value] || [];
                })
                setStableList(stableType);
            } else {
                setStableList([])
            }
        }).catch(() => {
            setStableList([])
        })
    }

    useEffect(() => {
        renderStableChart()
    }, []);

    useEffect(() => {
        fetchNetWorkErrorOverview({
            DomainId,
        }).then(res => {
            const data = res.data.data || [];
            setNetworkOptions(getTopOptions({titleText: '网络异常接口 TOP 10', data}));
        }).catch(() => {
            setNetworkOptions(
                getTopOptions({titleText: '网络异常接口 TOP 10', data: []})
            );
        })
    }, [])

    useEffect(() => {
        fetchStablerOverview({
            DomainId,
        }).then(res => {
            const data = res.data.data || [];
            setStableOptions(getTopOptions({titleText: '网络稳定接口 TOP 10', data}));
        }).catch(() => {
            setStableOptions(getTopOptions({titleText: '网络稳定接口 TOP 10', data: []}));
        })
    }, [])

    useEffect(() => {
        fetchErrorStableOverview({
            DomainId,
        }).then(res => {
            const data = res.data.data || [];
            setStableErrorOptions(getTopOptions({titleText: '页面错误 TOP 10', data}));
        }).catch(() => {
            setStableErrorOptions(getTopOptions({titleText: '页面错误 TOP 10', data: []}));
        })
    }, [])


    return (
        <Row>
            <Col span={12}>
                <Chart style={{ height: '400px' }} components={[GridComponent, LegendComponent, BarChart, TitleComponent, GraphicComponent]} options={stableOptions} events={eventObj}/>
            </Col>
            <Col span={12}>
                <Chart style={{ height: '400px' }} components={[GridComponent, LegendComponent, BarChart, TitleComponent, GraphicComponent]} options={networkOptions} events={eventObj}/>
            </Col>
            <Col span={12}>
                <Chart style={{ height: '400px' }} components={[GridComponent, LegendComponent, BarChart, TitleComponent, GraphicComponent]} options={stableErrorOptions} events={eventObj}/>
            </Col>
            {
                stableList.map(item => (<Col
                    span={12}
                    key={item.value}
                >
                    <Chart
                        style={{ height: '400px' }}
                        components={[GridComponent, LegendComponent, BarChart, TitleComponent, GraphicComponent]}
                        options={getTopOptions({titleText: STABLE_PAGE_TYPE.getName(item.value) + ' TOP 10', data: item.list})}
                        events={eventObj}/>
                </Col>)
                )
            }
        </Row>
    )
}

export default Dashboard;

import { useEffect, useCallback, useRef } from 'react';

import * as echarts from 'echarts/core';

import { CanvasRenderer } from 'echarts/renderers';

const Chart = ({ renderType = 'canvas', options, style, components = [] }) => {
    console.log(options);
    const chartRef = useRef();
    const chartInstance = useRef(null);

    const renderChart = useCallback(() => {
        const render = echarts?.getInstanceByDom(chartRef.current);
        if (render) {
            chartInstance.current = render;
        } else {
            chartInstance.current = echarts?.init(chartRef.current, null, {
                renderer: renderType,
            })
        }
        chartInstance.current?.setOption(options);
    }, [chartRef, options, renderType]);

    useEffect(() => {
        echarts?.use([CanvasRenderer, ...components]);
    }, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    useEffect(() => {
        renderChart();
        return () => {
            const { current } = chartInstance ?? {};
            if (current) {
                current.dispose();
            }
        }
    }, [chartInstance, renderChart]);

    const handleResize = () => {
        const chart = chartInstance?.current;
        if (chart) {
            chart.resize();
        }
    }

    return (
        <div
            ref={chartRef}
            style={{
                ...style
            }}
        />
    )
}

export default Chart;

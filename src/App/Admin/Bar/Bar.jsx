import React, { Component } from 'react';

import {Card} from "antd";
import ReactEcharts from "echarts-for-react";

import "./css/Bar.css";

export default class Bar extends Component {
    getOption = ()=>{
        return {
            title: {
                text: 'ECharts 入门示例'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        }
    };
    
    render(){
        return (
            <Card
                className="bar_card"
                bordered={false}
                title="柱状图"
            >
                <ReactEcharts
                    option = {this.getOption()}
                />
            </Card>
        )
    }
}

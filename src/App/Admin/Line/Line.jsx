import React, { Component } from 'react';

import {Card} from "antd";
import ReactEcharts from "echarts-for-react";
import "./css/Line.css";

export default class Line extends Component {
    getOption = ()=>{
        return {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [{
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'line',
                symbol: 'triangle',
                symbolSize: 20,
                lineStyle: {
                    normal: {
                        color: 'green',
                        width: 4,
                        type: 'dashed'
                    }
                },
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        borderColor: 'yellow',
                        color: 'blue'
                    }
                }
            }]
        }
    };
    
    render(){
        return (
            <Card
                className="line_card"
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

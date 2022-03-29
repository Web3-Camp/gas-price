import {useEffect} from "react";
import ReactECharts from 'echarts-for-react';
import  * as echarts from 'echarts';

interface echartObj{
    data:number[]
    timeData: string[]
}

export default function EchartsLine(props: echartObj){

    const getOption = ()=>{
        return {
            xAxis: {
                type: 'category',
                data: props.timeData,

            },
            yAxis: {
                type: 'value',
                min: function(value:any) {return value.min - 5;}
            },
            grid: {
                x: 40,
                y: 25,
                x2: 30,
                y2: 35
            },
            series: [
                {
                    itemStyle : {
                        normal : {
                            color:'purple',
                            lineStyle:{
                                color:'purple'
                            }
                        }
                    },
                    data: props.data,
                    type: 'line'
                }
            ]
        }
    }

    return<ReactECharts
        option={getOption()}
        lazyUpdate={true}
    />

}
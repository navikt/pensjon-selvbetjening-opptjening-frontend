import React from "react";
import Chart from 'chart.js';
import { useRef, useEffect } from 'react';
import './LineChart.less';
import {Undertittel} from "nav-frontend-typografi";

export const LineChart = (props) => {
    const chartRef = useRef(null);
    const chartConfig = {
        type: 'line',
        data: {
            labels: props.data.labels,
            datasets: [
                {
                    label: props.datasetLabel,
                    fill: false,
                    borderColor: "#FFBD66",
                    borderWidth: 2,
                    tension: 0,
                    radius: 1,
                    data: props.data.data
                }
            ]
        },
        options: {
            onClick: function(event, item){
                if(item && item[0]){
                    props.onclick(props.data.labels[item[0]._index]);
                }
            },
            legend:{
                display: false
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 50,
                    bottom: 50
                }
            }

        }
    };

    useEffect(() => {
        if (!chartRef) return;
        const ctx = chartRef.current.getContext("2d");
        new Chart(ctx, chartConfig);
    }, [chartConfig, chartRef]);

    return(
        <div className="chartContainer">
            <Undertittel>{props.title}</Undertittel>
            <canvas ref={chartRef}/>
        </div>
    );
};

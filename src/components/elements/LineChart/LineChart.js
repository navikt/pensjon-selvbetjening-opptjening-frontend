import React from "react";
import Chart from 'chart.js';
import { useRef, useEffect } from 'react';
import './LineChart.less';
import {Undertittel} from "nav-frontend-typografi";

const dataRow = (props) => {
    return(
        <tr key={props.key}>
            <td>{props.label}</td>
            <td>{props.data} kr</td>
        </tr>
    )
};
const buildDataRows = (labels, data)  => {
    let dataRows = [];
    labels.forEach((label, idx) => {
        dataRows.push(dataRow(
            {
                "key": idx,
                "label": label,
                "data": data[idx]
            }
        ))
    });
    return dataRows;
};

export const LineChart = (props) => {
    const chartRef = useRef(null);
    const chartConfig = {
        type: 'line',
        data: {
            labels: props.data.labels,
            datasets: [
                {
                    label: props.yLabel,
                    fill: false,
                    borderColor: "#000000",
                    borderWidth: 2,
                    tension: 0,
                    radius: 1,
                    data: props.data.data
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
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
            },
            scales: {
                xAxes: [
                    {
                        scaleLabel:{
                            display: true,
                            labelString: props.xLabel,
                            fontSize: 14
                        }
                    }
                ],
                yAxes: [
                    {
                        ticks: {
                            callback: function(value, index, values) {
                                return value + ' kr';
                            }
                        },
                        scaleLabel:{
                            display: true,
                            labelString: props.yLabel,
                            fontSize: 14
                        }
                    }
                ]
            }
        }
    };

    useEffect(() => {
        if (!chartRef) return;
        const ctx = chartRef.current.getContext("2d");
        new Chart(ctx, chartConfig);
    }, [chartConfig, chartRef]);

    const dataRows = buildDataRows(props.data.labels, props.data.data);
    return(
        <div className="chartContainer">
            <Undertittel>{props.title}</Undertittel>
            <canvas ref={chartRef} aria-label={props.title} role="img">
                {/* Fallback content */}
                <table>
                    <thead>
                        <tr>
                            <th>{props.xLabel}</th>
                            <th>{props.yLabel}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dataRows}
                    </tbody>
                </table>
            </canvas>
        </div>
    );
};

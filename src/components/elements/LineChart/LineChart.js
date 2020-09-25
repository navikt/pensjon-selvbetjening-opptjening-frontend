import React from "react";
import Chart from 'chart.js';
import { useRef, useEffect } from 'react';
import './LineChart.less';
import {Undertittel} from "nav-frontend-typografi";
import {formatAmount} from "../../../common/utils";

const dataRow = (props) => {
    return(
        <tr key={props.key}>
            <td>{props.label}</td>
            <td>{props.data ? props.data + " kr" : ""}</td>
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

const emptyFn = ()=>{};

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
                    borderColor: "#06893A",
                    borderWidth: 2,
                    backgroundColor: "#ffffff",
                    tension: 0,
                    radius: 2.5,
                    pointBackgroundColor: '#06893A',
                    data: props.data.data
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            animation: {
                duration: 0
            },
            onHover: (event, chartElement) => {
                event.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
            },
            onClick: function(event, item){
                if(item && item[0]){
                    props.onclick ? props.onclick(props.data.labels[item[0]._index]) : emptyFn();

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
                        gridLines: {
                            color: "#78706A"
                        },

                        ticks: {
                            maxTicksLimit: 5,
                            maxRotation: 0,
                            minRotation: 0,
                            fontColor: "#3E3832",
                        }

                    }
                ],
                yAxes: [
                    {
                        gridLines: {
                            color: "#78706A"
                        },
                        ticks: {
                            callback: function(value, index, values) {
                                return formatAmount(value) + ' kr';
                            },
                            fontColor: "#3E3832",
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
            <canvas ref={chartRef} aria-label={props.title}>
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

import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import Chart from 'chart.js';
import { useRef, useEffect } from 'react';
import {Undertittel} from "nav-frontend-typografi";
import 'nav-frontend-tabell-style';
import {formatAmount} from "../../../common/utils";
import './LineChart.less';
import {Knapp} from "nav-frontend-knapper";

const dataRow = (props) => {
    return(
        <tr key={props.key}>
            <td>{props.label}</td>
            <td>{props.data!==null ? "kr " + formatAmount(props.data) : ""}</td>
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
    const { t } = useTranslation();
    const chartRef = useRef(null);
    const chartConfig = {
        type: 'line',
        data: {
            labels: props.data.labels,
            datasets: [
                {
                    label: props.yLabel,
                    fill: false,
                    borderColor: "#005B82",
                    borderWidth: 2,
                    backgroundColor: "#ffffff",
                    tension: 0,
                    radius: 3.5,
                    pointBackgroundColor: '#005B82',
                    data: props.data.data,
                    pointHoverRadius: 10,
                    pointHoverBackgroundColor: 'rgba(62, 56, 50, 0.38)',
                    pointHoverBorderColor: 'rgba(62, 56, 50, 0.45)'
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
                            fontSize: 14
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
                                return 'kr ' + formatAmount(value);
                            },
                            fontColor: "#3E3832",
                            fontSize: 14
                        }
                    }
                ]
            },
            tooltips: {
                callbacks: {
                    title: function(tooltipItem, data) {
                        return data['labels'][tooltipItem[0]['index']];
                    },
                    beforeLabel: function(tooltipItem, data) {
                        return t('chart-pensjonsbeholdning') + ":";
                    },
                    label: function(tooltipItem, data) {
                        return 'kr ' + formatAmount(data['datasets'][0]['data'][tooltipItem['index']]);
                    },
                },
                backgroundColor: '#005B82',
                titleFontSize: 16,
                titleFontColor: '#ffffff',
                bodyFontColor: '#ffffff',
                bodyFontSize: 14,
                displayColors: false,
                borderColor: '#000000',
                borderWidth: 1,
                cornerRadius: 0,
                yPadding: 20,
                xPadding: 15,
                caretSize: 10,
            }
        }
    };

    useEffect(() => {
        if (!chartRef) return;
        const ctx = chartRef.current.getContext("2d");
        new Chart(ctx, chartConfig);
    }, [chartConfig, chartRef]);

    const [visibleComponent, setVisibleComponent] = useState("chart");
    const dataRows = buildDataRows(props.data.labels, props.data.data);

    let chartClass = "chartContainer";
    let tableClass = "tableContainer hidden";
    let chartButton = "chartButton selected";
    let tableButton = "tableButton";


    if(visibleComponent === "chart"){
        chartClass = "chartContainer";
        tableClass = "dataContainer hidden";
        chartButton = "chartButton selected";
        tableButton = "tableButton"
    } else if (visibleComponent === "table"){
        chartClass = "chartContainer hidden";
        tableClass = "dataContainer";
        chartButton = "chartButton";
        tableButton = "tableButton selected";
    }

    return(
        <div>
            <div className="chartTitleContainer">
                <Undertittel id="chartTitle">{props.title}</Undertittel>
                <div className="buttonContainer">
                    <Knapp mini className={chartButton} onClick={() => setVisibleComponent("chart")}>{t('chart-graf')}</Knapp>
                    <Knapp mini className={tableButton} onClick={() => setVisibleComponent("table")}>{t('chart-tabell')}</Knapp>
                </div>
            </div>
            <div className={chartClass} >
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
            <div className={tableClass}>
                <div className="tableContainer">
                    <table className="tabell">
                        <thead>
                        <tr>
                            <th>{props.xLabel}</th>
                            <th>{props.yLabel}</th>
                        </tr>
                        </thead>
                        <tbody>
                            {dataRows.reverse()}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

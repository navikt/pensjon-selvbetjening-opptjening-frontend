import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import Chart from 'chart.js';
import { useRef, useEffect } from 'react';
import {Undertittel} from "nav-frontend-typografi";
import 'nav-frontend-tabell-style';
import {formatAmount} from "../../../common/utils";
import './LineChart.less';
import {Knapp} from "nav-frontend-knapper";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import {BORN_IN_OR_BETWEEN_1954_AND_1962} from "../../../common/userGroups";

const amountRow = (amount, t) => {
    if(amount!==null) {
        return (
            <div className="chartAmountRow">
                <span className="chartKrColumn">kr</span>
                <span className="chartNumberColumn">{formatAmount(amount)}</span>
            </div>
        )
    } else{
        return (
            <div>{t('chart-ingen-pensjonsbeholdning')}</div>
        )
    }
};

const dataRow = (props) => {
    const {key, label, data, userGroup, t} = props;
    const pensjonsbeholdningTxt = data != null ? amountRow(data.pensjonsbeholdning, t) : "";
    const pensjonspoeng = data.pensjonspoeng;
    return(
        <tr key={key} className="row">
            <td data-testid="tableDataYear">{label}</td>
            <td data-testid="tableDataPensjonsbeholdning">{pensjonsbeholdningTxt}</td>
            {userGroup===BORN_IN_OR_BETWEEN_1954_AND_1962 && <td data-testid="tableDataPensjonspoeng">{pensjonspoeng}</td>}
        </tr>
    )
};
const buildDataRows = (tableMap, userGroup, t)  => {
    let dataRows = [];
    Object.keys(tableMap).forEach((year, idx) => {
        dataRows.push(dataRow(
            {
                "key": idx,
                "label": year,
                "data": tableMap[year],
                "userGroup": userGroup,
                "t": t
            }
        ))
    });
    return dataRows;
};

const emptyFn = ()=>{};

const removeYearsWithNullOpptjening =  (opptjeningMap) => {
    //Make a copy of opptjeningData before filtering
    const opptjeningMapCopy = {...opptjeningMap};
    let prevBeholdning = null;
    let prevPoeng = null;
    Object.keys(opptjeningMapCopy).every((year) => {
        prevBeholdning = opptjeningMapCopy[year].pensjonsbeholdning;
        prevPoeng = opptjeningMapCopy[year].pensjonspoeng;
        if(prevBeholdning !== null || (prevPoeng !== null && prevPoeng !== 0)) return false;
        if(opptjeningMapCopy[year].pensjonsbeholdning === null && (opptjeningMapCopy[year].pensjonspoeng === null || opptjeningMapCopy[year].pensjonspoeng === 0)){
            delete opptjeningMapCopy[year];
        }
        return true;
    });
    return opptjeningMapCopy
};

const removeYearsWithNullBeholdning =  (opptjeningMap) => {
    //Make a copy of opptjeningData before filtering
    const opptjeningMapCopy = {...opptjeningMap};
    let prev = null;
    Object.keys(opptjeningMapCopy).every((year) => {
        prev = opptjeningMapCopy[year].pensjonsbeholdning;
        if(prev !== null) return false;
        if(opptjeningMapCopy[year].pensjonsbeholdning === null){
            delete opptjeningMapCopy[year];
        }
        return true;
    });
    return opptjeningMapCopy
};

export const LineChart = (props) => {
    const { t } = useTranslation();
    const {data, userGroup} = props
    const yearLabel = t("chart-aar");
    const pensjonsbeholdningLabel = t("chart-pensjonsbeholdning");
    const pensjonspoengLabel = t('chart-pensjonspoeng');
    const chartRef = useRef(null);
    const tableMap = removeYearsWithNullOpptjening(data);
    const chartMap = removeYearsWithNullBeholdning(data);
    const chartConfig = {
        type: 'line',
        data: {
            labels: Object.keys(chartMap),
            datasets: [
                {
                    label: pensjonsbeholdningLabel,
                    fill: false,
                    borderColor: "#005B82",
                    borderWidth: 2,
                    backgroundColor: "#ffffff",
                    tension: 0,
                    radius: 3.5,
                    pointBackgroundColor: '#005B82',
                    data: Object.values(chartMap).map((prop) => prop.pensjonsbeholdning),
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
                    props.onclick ? props.onclick(Object.keys(chartMap)[item[0]._index]) : emptyFn();

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
                        const year = data['labels'][tooltipItem['index']];
                        if(userGroup===BORN_IN_OR_BETWEEN_1954_AND_1962){
                            return ['kr ' + formatAmount(chartMap[year].pensjonsbeholdning), '',t('chart-pensjonspoeng') + ': ' + chartMap[year].pensjonspoeng];
                        } else {
                            return 'kr ' + formatAmount(chartMap[year].pensjonsbeholdning);
                        }
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
                bodySpacing: 5,
            }
        }
    };

    useEffect(() => {
        if (!chartRef) return;
        const ctx = chartRef.current.getContext("2d");
        new Chart(ctx, chartConfig);
    }, [chartConfig, chartRef]);

    const [visibleComponent, setVisibleComponent] = useState("chart");
    const dataRows = buildDataRows(tableMap, userGroup, t);

    const toggleVisibleComponent = (component) => {
        const loggerName = (component === "chart") ? "Graf" : "Tabell";
        logToAmplitude({eventType: CLICK_EVENT, name: loggerName, titleKey: "chart-pensjonsbeholdningen-din", type: "Knapp", value: true});
        setVisibleComponent(component);
    };

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
                <Undertittel id="chartTitle">{t("chart-pensjonsbeholdningen-din")}</Undertittel>
                <div className="buttonContainer">
                    <Knapp mini className={chartButton} onClick={() => toggleVisibleComponent("chart")}>{t('chart-graf')}</Knapp>
                    <Knapp mini className={tableButton} onClick={() => toggleVisibleComponent("table")}>{t('chart-tabell')}</Knapp>
                </div>
            </div>
            <div className={chartClass} data-testid="chartContainer">
                <canvas ref={chartRef}/>
            </div>
            <div className={tableClass} data-testid="dataContainer">
                <div className="tableContainer">
                    <table className="tabell">
                        <thead>
                        <tr className="row">
                            <th data-testid="tableHeaderYear" className="column1">{yearLabel}</th>
                            <th data-testid="tableHeaderPensjonsbeholdning" className="column2">{pensjonsbeholdningLabel}</th>
                            {userGroup===BORN_IN_OR_BETWEEN_1954_AND_1962 && <th data-testid="tableHeaderPensjonspoeng" className="column3">{pensjonspoengLabel}</th>}
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

import React, {useState} from "react";
import {useTranslation} from "react-i18next";
import Chart from 'chart.js';
import { useRef, useEffect } from 'react';
import 'nav-frontend-tabell-style';
import {formatAmount, formatNumber, getCurrentLocale} from "../../../common/utils";
import './LineChart.less';
import {Knapp} from "nav-frontend-knapper";
import {CLICK_EVENT, logToAmplitude} from "../../../common/amplitude";
import {BORN_AFTER_1962, BORN_IN_OR_BETWEEN_1954_AND_1962} from "../../../common/userGroups";
import {PanelTitle} from "../PanelTitle/PanelTitle";

const amountRow = (amount, t) => {
    if(amount === null) {
        return (
            <div>{t('chart-ingen')}</div>
        )
    } else {
        return (
            <div>{formatAmount(amount)}</div>
        )
    }
};

const amountListItem = (amount, t) => {
    if(amount === null) {
        return (
            <span>{t('chart-ingen')}</span>
        )
    } else{
        return (
            <span>kr {formatAmount(amount)}</span>
        )
    }
};

const dataRow = (props) => {
    const {key, label, data, userGroup, t} = props;
    const pensjonsbeholdningTxt = amountRow(data.pensjonsbeholdning, t);
    const pensjonspoeng = data.pensjonspoeng;
    const uttakArray = getUttakArray(data);

    let cellClass = "";
    let rowClass = "";
    if(uttakArray.length>0){
        cellClass = "uttakCell";
        rowClass = "uttakRow";
    }

    return(
        <tr key={key} className="row">
            <td data-testid="tableDataYear" className={cellClass}><div className={rowClass}>{label}</div></td>
            <td data-testid="tableDataPensjonsbeholdning" className={cellClass}><div className={rowClass}>{pensjonsbeholdningTxt}</div></td>
            {userGroup===BORN_IN_OR_BETWEEN_1954_AND_1962 && <td data-testid="tableDataPensjonspoeng" className={cellClass}><div className={rowClass}>{pensjonspoeng!=null ? formatNumber(pensjonspoeng) : t('chart-ingen')}</div></td>}
            <td data-testid="tableDataUttak" className={cellClass}><div className={rowClass}>{uttakArray.join(", ")}</div></td>
        </tr>
    )
};

const listItem = (props) => {
    const {key, label, data, userGroup, t} = props;
    const pensjonsbeholdningTxt = amountListItem(data.pensjonsbeholdning, t);
    const pensjonspoeng = data.pensjonspoeng;
    const uttakArray = getUttakArray(data);
    let uttakList = "";
    let uttakItem = "beholdningPoengItem";

    if(uttakArray.length>0){
        uttakItem = "beholdningPoengUttakItem";
        uttakList = "beholdningPoengUttakList";
    }
    return(
        <li className={uttakItem} key={key}>
            <ul className={uttakList}>
                <li><b>{t("chart-aar")+": "} {label}</b></li>
                <li>{t("chart-pensjonsbeholdning")+": "} {pensjonsbeholdningTxt}</li>
                {userGroup === BORN_IN_OR_BETWEEN_1954_AND_1962 && <li>{t('chart-pensjonspoeng')+": "} {pensjonspoeng!==null ? formatNumber(pensjonspoeng) : t('chart-ingen')}</li>}
                <li>{t("chart-uttak")}: {uttakArray.join(", ")}</li>
            </ul>
        </li>
    )
};

const buildData = (tableMap, userGroup, t)  => {
    let dataRows = [];
    let dataListItems = [];
    Object.keys(tableMap).forEach((year, idx) => {
        const props = {
            "key": idx,
            "label": year,
            "data": tableMap[year],
            "userGroup": userGroup,
            "t": t
        };
        dataRows.push(dataRow(props))
        dataListItems.push(listItem(props))
    });
    return {dataRows, dataListItems};
};

const emptyFn = ()=>{};

const setPensjonsbeholdningNullTo0 =  (opptjeningMap) => {
    let opptjeningMapCopy = JSON.parse(JSON.stringify(opptjeningMap));
    Object.keys(opptjeningMapCopy).every((year) => {
        if(opptjeningMapCopy[year].pensjonsbeholdning == null){
            opptjeningMapCopy[year].pensjonsbeholdning = 0;
        }
        // if(opptjeningMapCopy[year].pensjonsbeholdning === 0 && (opptjeningMapCopy[year].pensjonspoeng === null || opptjeningMapCopy[year].pensjonspoeng === 0)){
        //     delete opptjeningMapCopy[year];
        // }
        return true;
    });
    return opptjeningMapCopy
};

const getUttakArray = (data) => {
    let uttakArray = [];
    if(data.uttak.length>0){
        uttakArray = data.uttak.map((uttak) => {
            const dato =  new Date(uttak.dato);
            const month = dato.toLocaleDateString(getCurrentLocale(), {month: 'long'});
            return uttak.uttaksgrad + " % (" + month + ")"
        });
    }
    return uttakArray;
};

export const LineChart = (props) => {
    const { t } = useTranslation();
    const {data, userGroup} = props;
    const yearLabel = t("chart-aar");
    const pensjonsbeholdningLabel = t("chart-pensjonsbeholdning");
    const pensjonsbeholdningKrLabel = t("chart-pensjonsbeholdning-kr");
    const pensjonspoengLabel = t("chart-pensjonspoeng");
    const uttakLabel = t("chart-uttak");
    const chartRef = useRef(null);
    const tableMap = data;
    const chartMap = setPensjonsbeholdningNullTo0(data);

    Chart.defaults.LineWithLine = Chart.defaults.line;
    Chart.controllers.LineWithLine = Chart.controllers.line.extend({
        draw: function(ease) {
            Chart.controllers.line.prototype.draw.call(this, ease);

            if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
                let activePoint = this.chart.tooltip._active[0],
                    ctx = this.chart.ctx,
                    x = activePoint.tooltipPosition().x,
                    topY = activePoint.tooltipPosition().y,
                    bottomY = this.chart.scales['y-axis-0'].bottom;

                // draw line
                ctx.save();
                ctx.beginPath();
                ctx.moveTo(x, topY);
                ctx.lineTo(x, bottomY);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#005B82';
                ctx.stroke();
                ctx.restore();
            }
        }
    });

    const chartConfig = {
        type: 'LineWithLine',
        data: {
            labels: Object.keys(chartMap),
            datasets: [
                {
                    label: pensjonsbeholdningLabel,
                    fill: true,
                    borderColor: "#005B82",
                    borderWidth: 2,
                    backgroundColor: 'rgb(102, 164, 220, 0.33)',
                    tension: 0,
                    radius: 3.5,
                    pointBackgroundColor: '#005B82',
                    data: Object.values(chartMap).map((prop) => prop.pensjonsbeholdning),
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
                    label: function(tooltipItem, data) {
                        const year = data['labels'][tooltipItem['index']];
                        let tooltip = [];
                        const tooltipBeholdning = tableMap[year].pensjonsbeholdning == null ?
                            t('chart-ingen') :
                            "kr " + formatAmount(tableMap[year].pensjonsbeholdning);

                        const uttakArray = getUttakArray(tableMap[year]);
                        if(uttakArray.length>0){
                            tooltip.push(t('chart-uttak') + ":");
                            tooltip.push(uttakArray.join(", "));
                            tooltip.push("");
                        }

                        tooltip.push(t('chart-pensjonsbeholdning') + ":");
                        tooltip.push(tooltipBeholdning);

                        if(userGroup===BORN_IN_OR_BETWEEN_1954_AND_1962){
                            let poeng = formatNumber(tableMap[year].pensjonspoeng) ? formatNumber(tableMap[year].pensjonspoeng) : t('chart-ingen');
                            tooltip.push("");
                            tooltip.push(t('chart-pensjonspoeng') + ":");
                            tooltip.push(poeng)
                        }

                        return tooltip;
                    },
                },
                intersect: false,
                axis: 'x',
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
        if(!ctx) return;
        new Chart(ctx, chartConfig);
    });

    let initialState = "chart";

    if(userGroup===BORN_IN_OR_BETWEEN_1954_AND_1962){
        initialState = "table";
    }

    const [visibleComponent, setVisibleComponent] = useState(initialState);
    const {dataRows, dataListItems} = buildData(tableMap, userGroup, t);

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
        chartButton = "selected";
        tableButton = ""
    } else if (visibleComponent === "table"){
        chartClass = "chartContainer hidden";
        tableClass = "dataContainer";
        chartButton = "";
        tableButton = "selected";
    }

    const ChartKnapp = (props) => {return (<Knapp mini className={chartButton + " " + props.className} onClick={() => toggleVisibleComponent("chart")}>{t('chart-graf')}</Knapp>)}
    const TableKnapp = (props) => {return (<Knapp mini className={tableButton + " " + props.className} onClick={() => toggleVisibleComponent("table")}>{t('chart-tabell')}</Knapp>)}

    let title, buttons;
    if(userGroup === BORN_AFTER_1962) {
        title = t("chart-pensjonsbeholdningen-din");
        buttons = (
            <div className="buttonContainer">
                <ChartKnapp className="leftButton"/>
                <TableKnapp/>
            </div>
        )
    } else if (userGroup === BORN_IN_OR_BETWEEN_1954_AND_1962) {
        title = t("chart-pensjonsbeholdningen-og-pensjonspoengene-dine");
        buttons = (
            <div className="buttonContainer">
                <TableKnapp className="leftButton"/>
                <ChartKnapp/>
            </div>
        )
    }

    return(
        <div>
            <div className="chartTitleContainer">
                <PanelTitle id="chartTitle" titleString={title}/>
                {buttons}
            </div>
            <div className={chartClass} data-testid="chartContainer">
                <canvas ref={chartRef}/>
            </div>
            <div className={tableClass} data-testid="dataContainer">
                <div className="tableContainer">
                    <table className="tabell beholdningAndPoengTabell">
                        <thead>
                        <tr className="row">
                            <th data-testid="tableHeaderYear" className="column1">{yearLabel}</th>
                            <th data-testid="tableHeaderPensjonsbeholdning" className="column2">{pensjonsbeholdningKrLabel}</th>
                            {userGroup===BORN_IN_OR_BETWEEN_1954_AND_1962 && <th data-testid="tableHeaderPensjonspoeng" className="column3">{pensjonspoengLabel}</th>}
                            <th data-testid="tableHeaderUttak" className="column4">{uttakLabel}</th>
                        </tr>
                        </thead>
                        <tbody>
                            {dataRows.reverse()}
                        </tbody>
                    </table>
                    <ul className="beholdningAndPoengList">
                        {dataListItems.reverse()}
                    </ul>
                </div>

            </div>
        </div>
    );
};

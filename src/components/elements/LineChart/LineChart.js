import React from "react";
import Chart from 'chart.js';
import { useRef, useEffect } from 'react';
import {useTranslation} from "react-i18next";

export const LineChart = (data) => {
    const { t, i18n } = useTranslation();
    const chartRef = useRef(null);

    const oData = data.data;
    const dataArray = Object.keys(oData).map((year) => oData[year].pensjonsbeholdning);


    const chartConfig = {
        type: 'line',
        data: {
            labels: Object.keys(data.data),
            datasets: [
                {
                    label: "Pensjonsbeholdning",
                    data: dataArray
                }
            ]
        },
        options: {

        }
    };

    useEffect(() => {
        if (!chartRef) return;
        const ctx = chartRef.current.getContext("2d");
        new Chart(ctx, chartConfig);
    }, [chartRef]);

    return(
        <div className="graphContainer">
            <canvas ref={chartRef}/>
        </div>
    );
};

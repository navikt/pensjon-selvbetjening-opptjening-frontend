import React from "react";
import Chart from 'chart.js';
import { useRef, useEffect } from 'react';

export const LineChart = (data) => {
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
    }, [chartConfig, chartRef]);

    return(
        <div className="graphContainer">
            <canvas ref={chartRef}/>
        </div>
    );
};

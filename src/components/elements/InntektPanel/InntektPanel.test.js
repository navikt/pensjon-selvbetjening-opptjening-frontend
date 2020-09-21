import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {InntektPanel} from './InntektPanel';

const data = {
    "inntekter": [
        {
            "year": 2018,
            "pensjonsgivendeInntekt": null
        },
        {
            "year": 2019,
            "pensjonsgivendeInntekt": 800000
        },
        {
            "year": 2020,
            "pensjonsgivendeInntekt": 900000
        },
    ]
};

it('renders the closed Inntekt panel with correct heading', () => {

    const panel = render(<InntektPanel data={data}/>);
    expect(panel.getByRole("heading")).toHaveTextContent("opptjening-pensjonsgivende-inntekter");
    expect(panel.queryAllByTestId("income-header").length).toBe(0)
});

it('renders the Inntekt panel and opens it with correct data sorted', () => {
    const panel = render(<InntektPanel data={data}/>);
    expect(panel.getByRole("heading")).toHaveTextContent("opptjening-pensjonsgivende-inntekter");

    fireEvent.click(panel.getByRole("heading"));

    expect(panel.getAllByTestId("income-header")[0]).toHaveTextContent("opptjening-year");
    expect(panel.getAllByTestId("income-header")[1]).toHaveTextContent("opptjening-income");

    expect(panel.getAllByTestId("income-row").length).toBe(3);

    expect(panel.getAllByTestId("income-label")[0]).toHaveTextContent("2020");
    expect(panel.getAllByTestId("income-amount")[0]).toHaveTextContent("900 000");
    expect(panel.getAllByTestId("income-label")[1]).toHaveTextContent("2019");
    expect(panel.getAllByTestId("income-amount")[1]).toHaveTextContent("800 000");
    expect(panel.getAllByTestId("income-label")[2]).toHaveTextContent("2018");
    expect(panel.getAllByTestId("income-amount")[2]).toHaveTextContent("opptjening-ikke-tilgjengelig-enda");



});

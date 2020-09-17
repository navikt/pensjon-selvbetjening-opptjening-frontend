import React from 'react';
import { render } from '@testing-library/react';
import {OpptjeningDetailsPanel} from './OpptjeningDetailsPanel';

const opptjening = {
    "pensjonsgivendeInntekt": 800000,
    "pensjonsbeholdning": 2750000,
    "omsorgspoeng": null,
    "omsorgspoengType": null,
    "pensjonspoeng": 0.0,
    "merknader": [

    ],
    "restpensjon": null,
    "maksUforegrad": 0,
    "endringOpptjening": [
        {
            "dato": "2016-12-31",
            "arsakType": "INNGAENDE",
            "arsakDetails": null,
            "endringBelop": null,
            "pensjonsbeholdningBelop": 2500000,
            "uttaksgrad": 0
        },
        {
            "dato": "2017-01-01",
            "arsakType": "OPPTJENING",
            "arsakDetails": [
                "OPPTJENING_2012"
            ],
            "endringBelop": 50000,
            "pensjonsbeholdningBelop":2550000,
            "uttaksgrad": 0
        },
        {
            "dato": "2017-05-01",
            "arsakType": "REGULERING",
            "arsakDetails": [
                "REGULERING"
            ],
            "endringBelop": 200000,
            "pensjonsbeholdningBelop": 2750000,
            "uttaksgrad": 0
        }
    ]

};

const opptjeningWithMerknad = {
    "pensjonsgivendeInntekt": 800000,
    "pensjonsbeholdning": 2750000,
    "omsorgspoeng": null,
    "omsorgspoengType": null,
    "pensjonspoeng": 0.0,
    "merknader": [
        "INGEN_OPPTJENING",
        "FORSTEGANGSTJENESTE"
    ],
    "restpensjon": null,
    "maksUforegrad": 0,
    "endringOpptjening": [
        {
            "dato": "2016-12-31",
            "arsakType": "INNGAENDE",
            "arsakDetails": null,
            "endringBelop": null,
            "pensjonsbeholdningBelop": 2500000,
            "uttaksgrad": 0
        },
        {
            "dato": "2017-01-01",
            "arsakType": "OPPTJENING",
            "arsakDetails": [
                "OPPTJENING_2012"
            ],
            "endringBelop": 50000,
            "pensjonsbeholdningBelop":2550000,
            "uttaksgrad": 0
        },
        {
            "dato": "2017-05-01",
            "arsakType": "REGULERING",
            "arsakDetails": [
                "REGULERING"
            ],
            "endringBelop": 200000,
            "pensjonsbeholdningBelop": 2750000,
            "uttaksgrad": 0
        }
    ]

};

const opptjeningTwoYearsBack = {
    "pensjonsgivendeInntekt": 600000,
    "pensjonsbeholdning": null,
    "omsorgspoeng": null,
    "omsorgspoengType": null,
    "pensjonspoeng": 0.0,
    "merknader": [

    ],
    "restpensjon": null,
    "maksUforegrad": 0,
    "endringOpptjening": null
};

it('should render open panel without any data passed in', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: {}, opptjeningTwoYearsBack:{}}} currentYear=""/>);
    expect(panel.getByRole("heading")).toHaveTextContent("opptjening-what-happened-this-year");
    expect(panel.getByRole("table")).toBeVisible();
    expect(panel.getByRole("row")).toBeVisible();
    expect(panel.queryAllByRole("cell")[0]).toBeVisible();
    expect(panel.queryAllByRole("cell")[1]).toBeVisible();
});

it('should render panel with details and income base two years back', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening, opptjeningTwoYearsBack}} currentYear="2017"/>);
    expect(panel.getByRole("heading")).toHaveTextContent("opptjening-what-happened-this-year");

    const tables =  panel.queryAllByRole("table");
    const detailsTable = tables[0];
    const incomebaseTable = tables[1];

    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("detail-0")).toBeVisible();
    expect(panel.getByTestId("label-detail-0")).toHaveTextContent("opptjening-assets");
    expect(panel.getByTestId("amount-detail-0")).toHaveTextContent("2 500 000");
    expect(panel.getByTestId("detail-1")).toBeVisible();
    expect(panel.getByTestId("label-detail-1")).toHaveTextContent("opptjening-earnings");
    expect(panel.getByTestId("amount-detail-1")).toHaveTextContent("50 000");
    expect(panel.getByTestId("detail-2")).toBeVisible();
    expect(panel.getByTestId("label-detail-2")).toHaveTextContent("opptjening-regulation");
    expect(panel.getByTestId("amount-detail-2")).toHaveTextContent("200 000");
    expect(panel.getByTestId("opptjening-sum")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-sum")).toHaveTextContent("opptjening-sum");
    expect(panel.getByTestId("amount-opptjening-sum")).toHaveTextContent("2 750 000");

    expect(incomebaseTable).toBeVisible();
    expect(panel.getByTestId("incomeBase")).toBeVisible();
    expect(panel.getByTestId("label-incomeBase")).toHaveTextContent("opptjening-income-base-from");
    expect(panel.getByTestId("amount-incomeBase")).toHaveTextContent("600 000");
});


it('should render panel with details and remarks table', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjeningWithMerknad, opptjeningTwoYearsBack}} currentYear="2017"/>);
    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-what-happened-this-year");
    expect(panel.queryAllByRole("heading")[1]).toHaveTextContent("opptjening-remarks-title");

    const tables =  panel.queryAllByRole("table");
    const detailsTable = tables[0];
    const incomebaseTable = tables[1];
    const remarksTable = tables[2];


    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("detail-0")).toBeVisible();
    expect(panel.getByTestId("label-detail-0")).toHaveTextContent("opptjening-assets");
    expect(panel.getByTestId("amount-detail-0")).toHaveTextContent("2 500 000");
    expect(panel.getByTestId("detail-1")).toBeVisible();
    expect(panel.getByTestId("label-detail-1")).toHaveTextContent("opptjening-earnings");
    expect(panel.getByTestId("amount-detail-1")).toHaveTextContent("50 000");
    expect(panel.getByTestId("detail-2")).toBeVisible();
    expect(panel.getByTestId("label-detail-2")).toHaveTextContent("opptjening-regulation");
    expect(panel.getByTestId("amount-detail-2")).toHaveTextContent("200 000");
    expect(panel.getByTestId("opptjening-sum")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-sum")).toHaveTextContent("opptjening-sum");
    expect(panel.getByTestId("amount-opptjening-sum")).toHaveTextContent("2 750 000");

    expect(incomebaseTable).toBeVisible();
    expect(panel.getByTestId("incomeBase")).toBeVisible();
    expect(panel.getByTestId("label-incomeBase")).toHaveTextContent("opptjening-income-base-from");
    expect(panel.getByTestId("amount-incomeBase")).toHaveTextContent("600 000");

    expect(remarksTable).toBeVisible();
    expect(panel.getByTestId("remark-row-0")).toBeVisible();
    expect(panel.getByTestId("remark-0")).toHaveTextContent("remarks:INGEN_OPPTJENING");
    expect(panel.getByTestId("remark-row-1")).toBeVisible();
    expect(panel.getByTestId("remark-1")).toHaveTextContent("remarks:FORSTEGANGSTJENESTE");

});

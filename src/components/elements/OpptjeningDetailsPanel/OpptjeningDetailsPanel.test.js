import React from 'react';
import { render } from '@testing-library/react';
import {OpptjeningDetailsPanel} from './OpptjeningDetailsPanel';

const opptjening = {
    "pensjonsgivendeInntekt": 800000,
    "pensjonsbeholdning": 2570000,
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
            "pensjonsbeholdningBelop": 2570000,
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
    const panel = render(<OpptjeningDetailsPanel data={{opptjening, opptjeningTwoYearsBack}} currentYear="2020"/>);
    expect(panel.getByRole("heading")).toHaveTextContent("opptjening-what-happened-this-year");

    panel.debug()
    // expect(panel.getByRole("table")).toBeVisible();
    // expect(panel.getByRole("row")).toBeVisible();
    // expect(panel.queryAllByRole("cell")[0]).toBeVisible();
    // expect(panel.queryAllByRole("cell")[1]).toBeVisible();
});




import React from 'react';
import {render} from '@testing-library/react';
import {OpptjeningDetailsPanel} from './OpptjeningDetailsPanel';
import mock from '../../../__mocks__/mock'
import mock_uttak from '../../../__mocks__/mock_simple_with_uttak'

import {formatAmount} from "../../../common/utils";

const opptjening2016 = mock.opptjening.opptjeningData["2016"];
const opptjening2014 = mock.opptjening.opptjeningData["2014"];
const opptjening2010 = mock.opptjening.opptjeningData["2010"];
const opptjening2008 = mock.opptjening.opptjeningData["2008"];
const opptjening2018WithUttak = mock_uttak.opptjening.opptjeningData["2018"];



it('should render open panel without any data passed in', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: {}, opptjeningTwoYearsBack:{}}} currentYear="" yearArray={[]}/>);
    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-increase-for-year");
    expect(panel.getByRole("table")).toBeVisible();
    expect(panel.getByRole("row")).toBeVisible();
    expect(panel.queryAllByRole("cell")[0]).toBeVisible();
    expect(panel.queryAllByRole("cell")[1]).toBeVisible();
});

it('should render panel with details and income base two years back', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjening2016, opptjeningTwoYearsBack: opptjening2014}} currentYear="2016" yearArray={[]}/>);
    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-increase-for-year");

    const tables =  panel.queryAllByRole("table");
    const detailsTable = tables[0];
    const incomebaseTable = tables[1];

    const beholdningBelop = opptjening2016.endringOpptjening[0].pensjonsbeholdningBelop;
    const opptjeningBelop = opptjening2016.endringOpptjening[1].endringBelop;
    const reguleringBelop = opptjening2016.endringOpptjening[2].endringBelop;
    const sum = opptjeningBelop + beholdningBelop + reguleringBelop;
    const incomeTwoYearsBack = opptjening2014.pensjonsgivendeInntekt;

    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("detail-0")).toBeVisible();
    expect(panel.getByTestId("label-detail-0")).toHaveTextContent("opptjening-assets");
    expect(panel.getByTestId("amount-detail-0").textContent).toEqual(formatAmount(beholdningBelop));
    expect(panel.getByTestId("detail-1")).toBeVisible();
    expect(panel.getByTestId("label-detail-1")).toHaveTextContent("opptjening-earnings");
    expect(panel.getByTestId("amount-detail-1").textContent).toEqual(formatAmount(opptjeningBelop));
    expect(panel.getByTestId("detail-2")).toBeVisible();
    expect(panel.getByTestId("label-detail-2")).toHaveTextContent("opptjening-regulation");
    expect(panel.getByTestId("amount-detail-2").textContent).toEqual(formatAmount(reguleringBelop));
    expect(panel.getByTestId("opptjening-sum")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-sum")).toHaveTextContent("opptjening-sum");
    expect(panel.getByTestId("amount-opptjening-sum").textContent).toEqual(formatAmount(sum));

    expect(incomebaseTable).toBeVisible();
    expect(panel.getByTestId("incomeBase")).toBeVisible();
    expect(panel.getByTestId("label-incomeBase")).toHaveTextContent("opptjening-income-base-from");
    expect(panel.getByTestId("amount-incomeBase").textContent).toEqual(formatAmount(incomeTwoYearsBack));
});


it('should render panel with details and remarks table', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjening2010, opptjeningTwoYearsBack: opptjening2014}} currentYear="2010" yearArray={[]}/>);
    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-increase-for-year");
    expect(panel.queryAllByRole("heading")[1]).toHaveTextContent("opptjening-pension-assets-for-year");
    expect(panel.queryAllByRole("heading")[2]).toHaveTextContent("opptjening-remarks-title");

    const tables =  panel.queryAllByRole("table");
    const remarksTable = tables[2];

    expect(remarksTable).toBeVisible();
    expect(panel.getByTestId("remark-row-0")).toBeVisible();
    expect(panel.getByTestId("remark-0")).toHaveTextContent("remarks:REFORM");
});

it('should render panel with details panel with correct label 2010 - opptjening-okning-reform', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjening2010, opptjeningTwoYearsBack: opptjening2008}} currentYear="2010" yearArray={[]}/>);
    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-increase-for-year");

    const tables =  panel.queryAllByRole("table");
    const detailsTable = tables[0];

    const beholdningBelop = opptjening2010.endringOpptjening[0].pensjonsbeholdningBelop;
    const opptjeningBelop = opptjening2010.endringOpptjening[1].endringBelop;
    const reguleringBelop = opptjening2010.endringOpptjening[2].endringBelop;
    const sum = opptjeningBelop + beholdningBelop + reguleringBelop;

    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("detail-0")).toBeVisible();
    expect(panel.getByTestId("label-detail-0")).toHaveTextContent("opptjening-assets");
    expect(panel.getByTestId("amount-detail-0").textContent).toEqual(formatAmount(beholdningBelop));
    expect(panel.getByTestId("detail-1")).toBeVisible();
    expect(panel.getByTestId("label-detail-1")).toHaveTextContent("opptjening-okning-reform");
    expect(panel.getByTestId("amount-detail-1").textContent).toEqual(formatAmount(opptjeningBelop));
    expect(panel.getByTestId("detail-2")).toBeVisible();
    expect(panel.getByTestId("label-detail-2")).toHaveTextContent("opptjening-regulation");
    expect(panel.getByTestId("amount-detail-2").textContent).toEqual(formatAmount(reguleringBelop));
    expect(panel.getByTestId("opptjening-sum")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-sum")).toHaveTextContent("opptjening-sum");
    expect(panel.getByTestId("amount-opptjening-sum").textContent).toEqual(formatAmount(sum));
});

it('should render panel with details showing only assets', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjening2008, opptjeningTwoYearsBack: {}}} currentYear="2008" yearArray={[]}/>);
    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-increase-for-year");

    const tables =  panel.queryAllByRole("table");
    const detailsTable = tables[0];
    const beholdning = opptjening2008.pensjonsbeholdning;

    expect(tables.length).toEqual(1);
    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("opptjening-your-pension-assets")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-your-pension-assets")).toHaveTextContent("opptjening-your-pension-assets");
    expect(panel.getByTestId("amount-opptjening-your-pension-assets").textContent).toEqual(formatAmount(beholdning));
});

it('should render panel with details including uttak', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjening2018WithUttak, opptjeningTwoYearsBack: {}}} currentYear="2018" yearArray={[]}/>);
    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-increase-for-year");

    const tables =  panel.queryAllByRole("table");
    const detailsTable = tables[0];

    const beholdningBelop = opptjening2018WithUttak.endringOpptjening[0].pensjonsbeholdningBelop;
    const opptjeningBelop = opptjening2018WithUttak.endringOpptjening[1].endringBelop;
    const reguleringBelop = opptjening2018WithUttak.endringOpptjening[2].endringBelop;
    const uttakBelop = opptjening2018WithUttak.endringOpptjening[3].endringBelop;

    const sum = opptjeningBelop + beholdningBelop + reguleringBelop + uttakBelop;

    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("detail-0")).toBeVisible();
    expect(panel.getByTestId("label-detail-0")).toHaveTextContent("opptjening-assets");
    expect(panel.getByTestId("amount-detail-0").textContent).toEqual(formatAmount(beholdningBelop));
    expect(panel.getByTestId("detail-1")).toBeVisible();
    expect(panel.getByTestId("label-detail-1")).toHaveTextContent("opptjening-earnings");
    expect(panel.getByTestId("amount-detail-1").textContent).toEqual(formatAmount(opptjeningBelop));
    expect(panel.getByTestId("detail-2")).toBeVisible();
    expect(panel.getByTestId("label-detail-2")).toHaveTextContent("opptjening-regulation");
    expect(panel.getByTestId("amount-detail-2").textContent).toEqual(formatAmount(reguleringBelop));
    expect(panel.getByTestId("detail-3")).toBeVisible();
    expect(panel.getByTestId("label-detail-3")).toHaveTextContent("opptjening-withdrawal");
    expect(panel.getByTestId("amount-detail-3").textContent).toEqual(formatAmount(uttakBelop));
    expect(panel.getByTestId("opptjening-sum")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-sum")).toHaveTextContent("opptjening-sum");
    expect(panel.getByTestId("amount-opptjening-sum").textContent).toEqual(formatAmount(sum));
});

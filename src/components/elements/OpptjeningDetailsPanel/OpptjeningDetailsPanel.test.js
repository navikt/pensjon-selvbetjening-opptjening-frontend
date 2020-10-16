import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {OpptjeningDetailsPanel} from './OpptjeningDetailsPanel';
import mock from '../../../__mocks__/mock'
import mock_uttak from '../../../__mocks__/mock_simple_with_uttak'
import mock_overfore_omsorgspoeng from '../../../__mocks__/mock_simple_with_overfore_omsorgspoeng'


import {formatAmount} from "../../../common/utils";

const opptjening2016 = mock.opptjening.opptjeningData["2016"];
const opptjening2014 = mock.opptjening.opptjeningData["2014"];
const opptjening2010 = mock.opptjening.opptjeningData["2010"];
const opptjening2008 = mock.opptjening.opptjeningData["2008"];
const opptjening2018WithUttak = mock_uttak.opptjening.opptjeningData["2018"];
const opptjening2018WithOverforeOmsorgsPoeng = mock_overfore_omsorgspoeng.opptjening.opptjeningData["2018"];




it('should render open panel without any data passed in', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: {}, opptjeningTwoYearsBack:{}}} currentYear="" yearArray={[]}/>);
    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");
    expect(panel.getByRole("table")).toBeVisible();
    expect(panel.getByRole("row")).toBeVisible();
    expect(panel.queryAllByRole("cell")[0]).toBeVisible();
    expect(panel.queryAllByRole("cell")[1]).toBeVisible();
});

it('should render panel with details and remarks table', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjening2010, opptjeningTwoYearsBack: opptjening2014}} currentYear="2010" yearArray={[]}/>);
    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");
    expect(panel.queryAllByRole("heading")[1]).toHaveTextContent("opptjening-details-vis-pensjonsbeholdningen-for");
    expect(panel.queryAllByRole("heading")[2]).toHaveTextContent("opptjening-details-merknader-tittel");

    const tables =  panel.queryAllByRole("table");
    const remarksTable = tables[1];

    expect(remarksTable).toBeVisible();
    expect(panel.getByTestId("remark-row-0")).toBeVisible();
    expect(panel.getByTestId("remark-0")).toHaveTextContent("remarks:REFORM");
});

it('should render panel with details panel with correct label 2010 - opptjening-details-okning-pga-reform', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjening2010, opptjeningTwoYearsBack: opptjening2008}} currentYear="2010" yearArray={[]}/>);
    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");

    const tables =  panel.queryAllByRole("table");
    const detailsTable = tables[0];

    const beholdningBelop = opptjening2010.endringOpptjening[0].pensjonsbeholdningBelop;
    const opptjeningBelop = opptjening2010.endringOpptjening[1].endringBelop;
    const reguleringBelop = opptjening2010.endringOpptjening[2].endringBelop;
    const sum = opptjeningBelop + beholdningBelop + reguleringBelop;

    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("detail-0")).toBeVisible();
    expect(panel.getByTestId("label-detail-0")).toHaveTextContent("opptjening-details-beholdning-i-starten-av-aaret");
    expect(panel.getByTestId("amount-detail-0").textContent).toEqual(formatAmount(beholdningBelop));
    expect(panel.getByTestId("detail-1")).toBeVisible();
    expect(panel.getByTestId("label-detail-1")).toHaveTextContent("opptjening-details-okning-pga-reform");
    expect(panel.getByTestId("amount-detail-1").textContent).toEqual(formatAmount(opptjeningBelop));
    expect(panel.getByTestId("detail-2")).toBeVisible();
    expect(panel.getByTestId("label-detail-2")).toHaveTextContent("opptjening-details-aarlig-regulering");
    expect(panel.getByTestId("amount-detail-2").textContent).toEqual(formatAmount(reguleringBelop));
    expect(panel.getByTestId("opptjening-details-total-pensjonsbeholdning")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-details-total-pensjonsbeholdning")).toHaveTextContent("opptjening-details-total-pensjonsbeholdning");
    expect(panel.getByTestId("amount-opptjening-details-total-pensjonsbeholdning").textContent).toEqual(formatAmount(sum));
});

it('should render panel with details showing only assets', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjening2008, opptjeningTwoYearsBack: {}}} currentYear="2008" yearArray={[]}/>);
    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");

    const tables =  panel.queryAllByRole("table");
    const detailsTable = tables[0];
    const beholdning = opptjening2008.pensjonsbeholdning;

    expect(tables.length).toEqual(1);
    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("opptjening-details-din-pensjonsbeholdning")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-details-din-pensjonsbeholdning")).toHaveTextContent("opptjening-details-din-pensjonsbeholdning");
    expect(panel.getByTestId("amount-opptjening-details-din-pensjonsbeholdning").textContent).toEqual(formatAmount(beholdning));
});

it('should render panel with details including uttak', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjening2018WithUttak, opptjeningTwoYearsBack: {}}} currentYear="2018" yearArray={[]}/>);
    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");

    const tables =  panel.queryAllByRole("table");
    const detailsTable = tables[0];

    const beholdningBelop = opptjening2018WithUttak.endringOpptjening[0].pensjonsbeholdningBelop;
    const opptjeningBelop = opptjening2018WithUttak.endringOpptjening[1].endringBelop;
    const reguleringBelop = opptjening2018WithUttak.endringOpptjening[2].endringBelop;
    const uttakBelop = opptjening2018WithUttak.endringOpptjening[3].endringBelop;

    const sum = opptjeningBelop + beholdningBelop + reguleringBelop + uttakBelop;

    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("detail-0")).toBeVisible();
    expect(panel.getByTestId("label-detail-0")).toHaveTextContent("opptjening-details-beholdning-i-starten-av-aaret");
    expect(panel.getByTestId("amount-detail-0").textContent).toEqual(formatAmount(beholdningBelop));
    expect(panel.getByTestId("detail-1")).toBeVisible();
    expect(panel.getByTestId("label-detail-1")).toHaveTextContent("opptjening-details-opptjening-basert-paa-pensjonsgivende-inntekt");
    expect(panel.getByTestId("amount-detail-1").textContent).toEqual(formatAmount(opptjeningBelop));
    expect(panel.getByTestId("detail-2")).toBeVisible();
    expect(panel.getByTestId("label-detail-2")).toHaveTextContent("opptjening-details-aarlig-regulering");
    expect(panel.getByTestId("amount-detail-2").textContent).toEqual(formatAmount(reguleringBelop));
    expect(panel.getByTestId("detail-3")).toBeVisible();
    expect(panel.getByTestId("label-detail-3")).toHaveTextContent("opptjening-details-uttak");
    expect(panel.getByTestId("amount-detail-3").textContent).toEqual(formatAmount(uttakBelop));
    expect(panel.getByTestId("opptjening-details-total-pensjonsbeholdning")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-details-total-pensjonsbeholdning")).toHaveTextContent("opptjening-details-total-pensjonsbeholdning");
    expect(panel.getByTestId("amount-opptjening-details-total-pensjonsbeholdning").textContent).toEqual(formatAmount(sum));
});


it('should render panel with details including link to overfore omsorgspoeng', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjening2018WithOverforeOmsorgsPoeng, opptjeningTwoYearsBack: {}}} currentYear="2018" yearArray={[]}/>);
    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");

    const tables =  panel.queryAllByRole("table");
    const detailsTable = tables[0];
    const remarksTable = tables[1];

    expect(detailsTable).toBeVisible();
    expect(remarksTable).toBeVisible();

    expect(panel.getByTestId("remark-row-0")).toBeVisible();
    expect(panel.queryAllByRole("link")[0]).toHaveTextContent("remarks:OVERFORE_OMSORGSOPPTJENING");
});

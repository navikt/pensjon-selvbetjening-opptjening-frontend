import React from 'react';
import {fireEvent, render} from '@testing-library/react';
import {OpptjeningDetailsPanel} from './OpptjeningDetailsPanel';
import {formatAmount} from "../../../common/utils";
import {constructOpptjening, constructEndringOpptjening} from "../../../__mocks__/mockDataGenerator";
import {axe} from "jest-axe";

it('should not fail any accessibility tests', async () => {
    const {getByRole, container} = render(<OpptjeningDetailsPanel data={{opptjening: {}}} currentYear="2010" yearArray={[]}/>);
    fireEvent.click(getByRole("heading"));

    expect(await axe(container)).toHaveNoViolations();
});

it('should render open panel without any data passed in', () => {
    const panel = render(<OpptjeningDetailsPanel data={{opptjening: {}}} currentYear=""
                                                 yearArray={[]}/>);
    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");
    expect(panel.getByRole("table")).toBeVisible();
    expect(panel.getByRole("row")).toBeVisible();
    expect(panel.queryAllByRole("cell")[0]).toBeVisible();
    expect(panel.queryAllByRole("cell")[1]).toBeVisible();
});

it('should render panel with details and remarks table', () => {
    const expectedMerknad = "REFORM"
    const opptjeningWithMerknad = constructOpptjening({merknader: [expectedMerknad]})

    const panel = render(<OpptjeningDetailsPanel
        data={{opptjening: opptjeningWithMerknad}} currentYear="2010"
        yearArray={[]}/>);
    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");
    expect(panel.queryAllByRole("heading")[1]).toHaveTextContent("opptjening-details-vis-pensjonsbeholdningen-for");
    expect(panel.queryAllByRole("heading")[2]).toHaveTextContent("opptjening-details-merknader-tittel");
    expect(panel.getByTestId("remarkstext-0")).toHaveTextContent("remarks:" + expectedMerknad);
});

it('should render panel with details panel with correct label 2010 - opptjening-details-okning-pga-reform', () => {
    const expectedBeholdningBelop = 268407
    const expectedOpptjeningBelop = 62033
    const expectedReguleringBelop = 12513
    const expectedPensjonsbeholdning = 342955

    const endringOpptjening = [
        constructEndringOpptjening({
            arsakType: "INNGAENDE",
            pensjonsbeholdningBelop: expectedBeholdningBelop
        }),
        constructEndringOpptjening({
            arsakType: "INNGAENDE_2010",
            endringBelop: expectedOpptjeningBelop,
            grunnlagTypes: []
        }),
        constructEndringOpptjening({
            arsakType: "REGULERING",
            endringBelop: expectedReguleringBelop
        })
    ]
    const opptjening2010 = constructOpptjening({
        endringOpptjening: endringOpptjening, pensjonsbeholdning: expectedPensjonsbeholdning
    })

    const panel = render(<OpptjeningDetailsPanel
        data={{opptjening: opptjening2010}} currentYear="2010"
        yearArray={[]}/>);

    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");

    const tables = panel.queryAllByRole("table");
    const detailsTable = tables[0];


    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("detail-0")).toBeVisible();
    expect(panel.getByTestId("label-detail-0")).toHaveTextContent("opptjening-details-beholdning-i-starten-av-aaret");
    expect(panel.getByTestId("amount-detail-0").textContent).toEqual(formatAmount(expectedBeholdningBelop));
    expect(panel.getByTestId("detail-1")).toBeVisible();
    expect(panel.getByTestId("label-detail-1")).toHaveTextContent("opptjening-details-okning-pga-reform");
    expect(panel.getByTestId("amount-detail-1").textContent).toEqual(formatAmount(expectedOpptjeningBelop));
    expect(panel.getByTestId("detail-2")).toBeVisible();
    expect(panel.getByTestId("label-detail-2")).toHaveTextContent("opptjening-details-aarlig-regulering");
    expect(panel.getByTestId("amount-detail-2").textContent).toEqual(formatAmount(expectedReguleringBelop));
    expect(panel.getByTestId("opptjening-details-total-pensjonsbeholdning")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-details-total-pensjonsbeholdning")).toHaveTextContent("opptjening-details-total-pensjonsbeholdning");
    expect(panel.getByTestId("amount-opptjening-details-total-pensjonsbeholdning").textContent).toEqual(formatAmount(expectedPensjonsbeholdning));
});

it('should render panel with details showing only assets', () => {
    const opptjening2008 = constructOpptjening({
        pensjonsbeholdning: 212556
    })

    const panel = render(<OpptjeningDetailsPanel data={{opptjening: opptjening2008}}
                                                 currentYear="2008" yearArray={[]}/>);
    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");

    const tables = panel.queryAllByRole("table");
    const detailsTable = tables[0];
    const beholdning = opptjening2008.pensjonsbeholdning;

    expect(tables.length).toEqual(1);
    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("opptjening-details-din-pensjonsbeholdning")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-details-din-pensjonsbeholdning")).toHaveTextContent("opptjening-details-din-pensjonsbeholdning");
    expect(panel.getByTestId("amount-opptjening-details-din-pensjonsbeholdning").textContent).toEqual(formatAmount(beholdning));
});

it('should render panel with details including uttak', () => {
    const expectedInngaendeBeholdningBelop = 268407
    const expectedOpptjeningBelop = 62033
    const expectedReguleringBelop = 12513
    const expectedPensjonsbeholdning = 342955
    const expectedUttakBelop = 50000

    const endringOpptjening = [
        constructEndringOpptjening({
            arsakType: "INNGAENDE",
            pensjonsbeholdningBelop: expectedInngaendeBeholdningBelop
        }),
        constructEndringOpptjening({
            arsakType: "OPPTJENING",
            endringBelop: expectedOpptjeningBelop,
            grunnlagTypes: ["INNTEKT_GRUNNLAG"]
        }),
        constructEndringOpptjening({
            arsakType: "REGULERING",
            endringBelop: expectedReguleringBelop
        }),
        constructEndringOpptjening({
            arsakType: "UTTAK",
            endringBelop: expectedUttakBelop
        })
    ]
    const opptjeningWithUttak = constructOpptjening({
        endringOpptjening: endringOpptjening, pensjonsbeholdning: expectedPensjonsbeholdning
    })

    const panel = render(<OpptjeningDetailsPanel
        data={{opptjening: opptjeningWithUttak}} currentYear="2018" yearArray={[]}/>);
    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");

    const tables = panel.queryAllByRole("table");
    const detailsTable = tables[0];

    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("detail-0")).toBeVisible();
    expect(panel.getByTestId("label-detail-0")).toHaveTextContent("opptjening-details-beholdning-i-starten-av-aaret");
    expect(panel.getByTestId("amount-detail-0").textContent).toEqual(formatAmount(expectedInngaendeBeholdningBelop));
    expect(panel.getByTestId("detail-1")).toBeVisible();
    expect(panel.getByTestId("label-detail-1")).toHaveTextContent("opptjening-details-opptjening-basert-paa-pensjonsgivende-inntekt");
    expect(panel.getByTestId("amount-detail-1").textContent).toEqual(formatAmount(expectedOpptjeningBelop));
    expect(panel.getByTestId("detail-2")).toBeVisible();
    expect(panel.getByTestId("label-detail-2")).toHaveTextContent("opptjening-details-aarlig-regulering");
    expect(panel.getByTestId("amount-detail-2").textContent).toEqual(formatAmount(expectedReguleringBelop));
    expect(panel.getByTestId("detail-3")).toBeVisible();
    expect(panel.getByTestId("label-detail-3")).toHaveTextContent("opptjening-details-uttak");
    expect(panel.getByTestId("amount-detail-3").textContent).toEqual(formatAmount(expectedUttakBelop));
    expect(panel.getByTestId("opptjening-details-total-pensjonsbeholdning")).toBeVisible();
    expect(panel.getByTestId("label-opptjening-details-total-pensjonsbeholdning")).toHaveTextContent("opptjening-details-total-pensjonsbeholdning");
    expect(panel.getByTestId("amount-opptjening-details-total-pensjonsbeholdning").textContent).toEqual(formatAmount(expectedPensjonsbeholdning));
});

it('should render labels for inntekt-grunnlag when INNTEKT_GRUNNLAG', () => {
    testOpptjeningWithGrunnlagType(["INNTEKT_GRUNNLAG"], "opptjening-details-opptjening-basert-paa-pensjonsgivende-inntekt")
});

it('should render labels for dagpenger-grunnlag when DAGPENGER_GRUNNLAG', () => {
    testOpptjeningWithGrunnlagType(["DAGPENGER_GRUNNLAG"], "opptjening-details-opptjening-basert-paa-dagpenger")
});

it('should render labels for uforetrygd-grunnlag when UFORE_GRUNNLAG', () => {
    testOpptjeningWithGrunnlagType(["UFORE_GRUNNLAG"], "opptjening-details-opptjening-basert-paa-uforetrygd")
});

it('should render labels for førstegangstjeneste-grunnlag when FORSTEGANGSTJENESTE_GRUNNLAG', () => {
    testOpptjeningWithGrunnlagType(["FORSTEGANGSTJENESTE_GRUNNLAG"], "opptjening-details-opptjening-basert-paa-forstegangstjeneste")
});

it('should render labels for omsorgsopptjening-grunnlag when OMSORGSOPPTJENING_GRUNNLAG', () => {
    testOpptjeningWithGrunnlagType(["OMSORGSOPPTJENING_GRUNNLAG"], "opptjening-details-omsorgsopptjening")
});

it('should render labels for no grunnlag when NO_GRUNNLAG', () => {
    testOpptjeningWithGrunnlagType(["NO_GRUNNLAG"], "opptjening-details-opptjening")
});

it('should render label when several grunnlag', () => {
    testOpptjeningWithGrunnlagType(["UFORE_GRUNNLAG", "FORSTEGANGSTJENESTE_GRUNNLAG"], "opptjening-details-opptjening-basert-paa-flere-ytelser")
});

const testOpptjeningWithGrunnlagType = (grunnlagTypes, expectedGrunnlagText) => {
    const expectedOpptjeningBelop = 150
    const endringOpptjening = [
        constructEndringOpptjening({
            arsakType: "INNGAENDE",
        }),
        constructEndringOpptjening({
            arsakType: "OPPTJENING",
            endringBelop: expectedOpptjeningBelop,
            grunnlagTypes: grunnlagTypes
        })
    ]

    const opptjeningWithGrunnlag = constructOpptjening({
        endringOpptjening: endringOpptjening
    })

    const panel = render(<OpptjeningDetailsPanel
        data={{opptjening: opptjeningWithGrunnlag}} currentYear="2018" yearArray={[]}/>);
    fireEvent.click(panel.getByRole("heading"));

    expect(panel.queryAllByRole("heading")[0]).toHaveTextContent("opptjening-details-din-okning-ar-for-ar");

    const tables = panel.queryAllByRole("table");
    const detailsTable = tables[0];

    expect(detailsTable).toBeVisible();
    expect(panel.getByTestId("detail-1")).toBeVisible();
    expect(panel.getByTestId("label-detail-1")).toHaveTextContent(expectedGrunnlagText);
    expect(panel.getByTestId("amount-detail-1").textContent).toEqual(formatAmount(expectedOpptjeningBelop));
}

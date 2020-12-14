import React from 'react';
import {render, screen} from '@testing-library/react';
import {BeholdningAndPensjonspoengForklartPanel} from './BeholdningAndPensjonspoengForklartPanel';

it('renders beholdningAndPensjonspoengForklartPanel with correct heading and text', () => {
    render(<BeholdningAndPensjonspoengForklartPanel/>);
    expect(screen.getByRole('heading')).toHaveTextContent("beholdning-and-pensjonspoeng-forklart");
    expect(screen.getByText("beholdning-and-pensjonspoeng-forklart-tekst")).toBeInTheDocument();
    expect(screen.getByText("beholdning-and-pensjonspoeng-forklart-illustrasjon-tekst")).toBeInTheDocument();
});

it('should render correct amount of bars in regelverkShareDiagram', () => {
    const expectedNumberOfPensjonsbeholdningShare = 7;
    render(<BeholdningAndPensjonspoengForklartPanel andelPensjonBasertPaBeholdning={expectedNumberOfPensjonsbeholdningShare}/>);

    expect(screen.getAllByTestId("pensjonsbeholdningShare").length).toBe(expectedNumberOfPensjonsbeholdningShare);
    expect(screen.getAllByTestId("pensjonspoengShare").length).toBe(10 - expectedNumberOfPensjonsbeholdningShare);
});

it('should render color explanation texts for regelverkShareDiagram', () => {
    render(<BeholdningAndPensjonspoengForklartPanel/>);
    expect(screen.getByText("beholdning-and-pensjonspoeng-forklart-andel-pensjonsbeholdning")).toBeInTheDocument();
    expect(screen.getByText("beholdning-and-pensjonspoeng-forklart-andel-pensjonspoeng")).toBeInTheDocument();

});

it('should render link to more info', () => {
    render(<BeholdningAndPensjonspoengForklartPanel/>);
    expect(screen.getByRole('link')).toHaveTextContent('beholdning-and-pensjonspoeng-forklart-lenke');
});
import React from 'react';
import {render} from '@testing-library/react';
import {PensjonspoengForklartPanel} from './PensjonspoengForklartPanel';
import userEvent from "@testing-library/user-event";

it('renders pensjonspoengForklartPanel with correct heading and text', () => {
    const { getByRole, getByTestId } = render(<PensjonspoengForklartPanel/>);
    userEvent.click(getByRole("heading"));
    expect(getByRole('heading')).toHaveTextContent("pensjonspoeng-forklart");
    expect(getByTestId("explanationText")).toHaveTextContent("pensjonspoeng-forklart-tekst");
});

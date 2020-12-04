import React from 'react';
import { render } from '@testing-library/react';
import {BeholdningForklartPanel} from './BeholdningForklartPanel';
import userEvent from "@testing-library/user-event";

it('renders beholdningForklartPanel with correct heading and text', () => {
    const { getByRole, getByTestId } = render(<BeholdningForklartPanel/>);
    userEvent.click(getByRole("heading"));
    expect(getByRole('heading')).toHaveTextContent("pensjonsbeholdning-forklart");
    expect(getByTestId("explanationText")).toHaveTextContent("pensjonsbeholdning-forklart-tekst");
});

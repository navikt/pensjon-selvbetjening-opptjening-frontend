import React from 'react';
import { render } from '@testing-library/react';
import {BeholdningPanel} from './BeholdningPanel';

it('renders the Beholdning panel with correct heading and correct formatted assets', () => {
    const panel = render(<BeholdningPanel data={{'beholdning': "1200000"}}/>);

    expect(panel.getByRole("heading")).toHaveTextContent("beholdning-din-pensjonsbeholdning-i-folketrygden");
    expect(panel.getByTestId("assets")).toHaveTextContent("1 200 000");
});

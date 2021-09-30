import React from 'react';
import { render } from '@testing-library/react';
import {BeholdningPanel} from './BeholdningPanel';
import {formatAmount} from "../../../common/utils";

it('renders the Beholdning panel with correct heading and correct amount for assets', () => {
    const panel = render(<BeholdningPanel data={{'beholdning': "1200000"}}/>);

    expect(panel.getByRole("heading")).toHaveTextContent("beholdning-din-pensjonsbeholdning-i-folketrygden");
    expect(panel.getByTestId("assets").textContent).toEqual("kr " + formatAmount(1200000));
});

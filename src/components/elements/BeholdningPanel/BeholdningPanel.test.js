import React from 'react';
import { render } from '@testing-library/react';
import {BeholdningPanel} from './BeholdningPanel';

it('renders the Beholdning panel with correct heading and correct formatted assets', () => {
    const panel = render(<BeholdningPanel data={{'beholdning': "1200000"}}/>);

    expect(panel.getAllByRole("heading")[0]).toHaveTextContent("opptjening-your-pension-assets");
    expect(panel.getAllByRole("heading")[1]).toHaveTextContent("1 200 000");
});

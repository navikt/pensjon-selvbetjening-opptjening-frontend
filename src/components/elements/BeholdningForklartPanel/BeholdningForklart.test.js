import React from 'react';
import { render } from '@testing-library/react';
import {BeholdningForklartPanel} from './BeholdningForklartPanel';

it('renders the FAQ link panel with correct link and text', () => {
    const { getByRole } = render(<BeholdningForklartPanel/>);
    expect(getByRole('heading')).toHaveTextContent("pensjonsbeholdning-forklart");
});

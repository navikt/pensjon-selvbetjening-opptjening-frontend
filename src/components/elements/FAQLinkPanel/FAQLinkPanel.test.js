import React from 'react';
import { render } from '@testing-library/react';
import {FAQLinkPanel} from './FAQLinkPanel';

it('renders the FAQ link panel with correct link and text', () => {
    const { getByRole } = render(<FAQLinkPanel/>);
    expect(getByRole('link')).toHaveAttribute('href', process.env.PUBLIC_URL + "/faq");
    expect(getByRole('title')).toHaveTextContent("opptjening-frequently-asked-questions");
});

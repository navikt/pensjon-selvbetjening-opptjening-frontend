import React from 'react';
import { render } from '@testing-library/react';
import {FAQPanel} from './FAQPanel';

it('renders the FAQ link panel with correct link and text', () => {
    const { getByRole } = render(<FAQPanel/>);
    expect(getByRole('heading')).toHaveTextContent("opptjening-frequently-asked-questions");
});

it('should render FaqView with two questions', () => {
    const { getByTestId, queryAllByRole } = render(<FAQPanel/>);
    expect(getByTestId("faqview")).toBeVisible();
    expect(queryAllByRole("button")[0]).toHaveTextContent("faq:faq-question-1")
    expect(queryAllByRole("button")[1]).toHaveTextContent("faq:faq-question-2")
});

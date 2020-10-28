import React from 'react';
import { render } from '@testing-library/react';
import {FAQPanel} from './FAQPanel';
import {axe} from "jest-axe";

it('should not fail any accessibility tests', async () => {
    const {container} = render(<FAQPanel/>);

    expect(await axe(container)).toHaveNoViolations();
});

it('renders the FAQ link panel with correct link and text', () => {
    const { getByRole } = render(<FAQPanel/>);
    expect(getByRole('heading')).toHaveTextContent("faq-ofte-stilte-sporsmaal");
});

it('should render FaqView with two questions', () => {
    const { getByTestId, queryAllByRole } = render(<FAQPanel/>);
    expect(getByTestId("faqview")).toBeVisible();
    expect(queryAllByRole("button")[0]).toHaveTextContent("faq:faq-question-1")
    expect(queryAllByRole("button")[1]).toHaveTextContent("faq:faq-question-2")
});

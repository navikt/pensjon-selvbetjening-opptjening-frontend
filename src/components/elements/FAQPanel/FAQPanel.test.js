import React from 'react';
import { render } from '@testing-library/react';
import {FAQPanel} from './FAQPanel';
import {axe} from "jest-axe";
import * as amplitude from "../../../common/amplitude";
import userEvent from "@testing-library/user-event";

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
    expect(queryAllByRole("button")[0]).toHaveTextContent("faq:faq-question-1");
    expect(queryAllByRole("button")[1]).toHaveTextContent("faq:faq-question-2");
});

it('should render the FaqView panel, open a question and log CLICK event to Amplitude', () => {
    let spy = jest.spyOn(amplitude, "logToAmplitude");
    const { queryAllByRole } = render(<FAQPanel/>);

    userEvent.click(queryAllByRole("button")[0]);
    expect(spy).toHaveBeenCalled();
});

import React from 'react';
import { render } from '@testing-library/react';
import {FAQPanel} from './FAQPanel';
import {axe} from "jest-axe";
import * as amplitude from "../../../common/amplitude";
import userEvent from "@testing-library/user-event";
import {BORN_AFTER_1962, BORN_IN_OR_BETWEEN_1943_AND_1953} from "../../../common/userGroups";

it('should not fail any accessibility tests', async () => {
    const {container} = render(<FAQPanel userGroup={BORN_AFTER_1962}/>);

    expect(await axe(container)).toHaveNoViolations();
});

it('renders the FAQ link panel with correct link and text', () => {
    const { getByRole } = render(<FAQPanel userGroup={BORN_AFTER_1962}/>);
    expect(getByRole('heading')).toHaveTextContent("faq-ofte-stilte-sporsmaal");
});

it('should render FaqView with two questions', () => {
    const { getByTestId, queryAllByRole } = render(<FAQPanel userGroup={BORN_AFTER_1962}/>);
    expect(getByTestId("faqview")).toBeVisible();
    expect(queryAllByRole("button")[0]).toHaveTextContent("faq:faq-question-1");
    expect(queryAllByRole("button")[1]).toHaveTextContent("faq:faq-question-2");
});

it('should render FaqView with ', () => {
    const { getByTestId, queryAllByRole, debug} = render(<FAQPanel userGroup={BORN_IN_OR_BETWEEN_1943_AND_1953}/>);
    expect(getByTestId("faqview")).toBeVisible();
    expect(queryAllByRole("button")[0]).toHaveTextContent("faq:faq-question-1");
    expect(queryAllByRole("button")[1]).toHaveTextContent("faq:faq-question-2");
});

it('should render the FaqView panel, open a question and log CLICK event to Amplitude', () => {
    let spy = jest.spyOn(amplitude, "logToAmplitude");
    const { queryAllByRole } = render(<FAQPanel userGroup={BORN_AFTER_1962}/>);

    userEvent.click(queryAllByRole("button")[0]);
    expect(spy).toHaveBeenCalled();
});

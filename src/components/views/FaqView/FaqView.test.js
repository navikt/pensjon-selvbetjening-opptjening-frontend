import React from 'react';
import { render } from '@testing-library/react';
import {FaqView} from "./FaqView";

it('should render FaqView', () => {
    let view = render(<FaqView/>);
    expect(view.getByTestId("faqview")).toBeVisible();
    expect(view.queryAllByRole("button")[0]).toHaveTextContent("faq-question-1")
    expect(view.queryAllByRole("button")[1]).toHaveTextContent("faq-question-2")
});







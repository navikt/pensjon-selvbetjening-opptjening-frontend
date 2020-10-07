import React from 'react';
import { render } from '@testing-library/react';
import {FaqView} from "./FaqView";

it('should render FaqView', () => {
    let view = render(<FaqView/>);
    expect(view.getByTestId("faqview")).toBeVisible();
});







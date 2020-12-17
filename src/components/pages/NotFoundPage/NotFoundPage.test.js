import React from 'react';
import { render } from '@testing-library/react';
import { NotFoundPage } from "./NotFoundPage";
import { BrowserRouter as Router } from "react-router-dom";

it('should render NotFoundPage with topBanner and body', () => {
    let page = render(<Router><NotFoundPage/></Router>);

    expect(page.getByTestId("topbanner")).toBeVisible();
    expect(page.getByTestId("error-status-404")).toBeVisible();
});







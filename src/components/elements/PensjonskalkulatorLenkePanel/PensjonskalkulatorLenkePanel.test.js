import React from 'react';
import {render, screen} from '@testing-library/react';
import {PensjonskalkulatorLenkePanel} from "./PensjonskalkulatorLenkePanel";
import * as urlHelper from "../../../common/urlHelper";

it('should render PensjonskalkulatorLenkePanel with correct heading', () => {
    render(<PensjonskalkulatorLenkePanel/>);
    expect(screen.getByRole('heading')).toHaveTextContent("pensjonskalkulator-lenke-title");

});

it('should render PensjonskalkulatorLenkePanel with link to pensjonskalkulatoren', () => {
    render(<PensjonskalkulatorLenkePanel/>);
    expect(screen.getByRole('heading').closest('a')).toHaveAttribute('href', urlHelper.PENSJONSKALKULATOR_URL);
});

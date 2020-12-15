import React from 'react';
import {render, screen} from '@testing-library/react';
import {PensjonskalkulatorLenkePanel} from "./PensjonskalkulatorLenkePanel";

it('should render PensjonskalkulatorLenkePanel with correct heading', () => {
    render(<PensjonskalkulatorLenkePanel/>);
    expect(screen.getByRole('heading')).toHaveTextContent("pensjonskalkulator-lenke-title");

});

it('should render PensjonskalkulatorLenkePanel with link to pensjonskalkulatoren', () => {
    render(<PensjonskalkulatorLenkePanel/>);
    expect(screen.getByRole('heading').closest('a')).toHaveAttribute('href', process.env.REACT_APP_PENSJONSKALKULATOR_URL);
});
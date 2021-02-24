import React from 'react';
import {render, screen} from '@testing-library/react';
import {OverforeOmsorgsOpptjeningPanel} from "./OverforeOmsorgsOpptjeningPanel";
import * as urlHelper from "../../../common/urlHelper";

it('should render OverforeOmsorgsOpptjeningPanel with correct heading', () => {
    render(<OverforeOmsorgsOpptjeningPanel/>);
    expect(screen.getByRole('heading')).toHaveTextContent("overfore-omsorgsopptjening-title");

});

it('should render OverforeOmsorgsOpptjeningPanel with link to overforing page', () => {
    render(<OverforeOmsorgsOpptjeningPanel/>);
    expect(screen.getByRole('heading').closest('a')).toHaveAttribute('href', urlHelper.OVERFORE_OMSORGSOPPTJENING_URL);
});

it('should render OverforeOmsorgsOpptjeningPanel with explanation text', () => {
    render(<OverforeOmsorgsOpptjeningPanel/>);
    expect(screen.getByText('overfore-omsorgsopptjening-text')).toBeInTheDocument();
});



import React from 'react';
import { render } from '@testing-library/react';
import {TopBanner} from './TopBanner';

it('renders default frontpage topbanner', () => {
    const { getByText, getByRole } = render(<TopBanner title="TOPBANNER_TITLE" text="TOPBANNER_TEXT"/>);
    expect(getByText('TOPBANNER_TITLE')).toBeInTheDocument();
    expect(getByText('TOPBANNER_TEXT')).toBeInTheDocument();
    expect(getByRole('presentation')).toBeInTheDocument();
});

it('renders topbanner without illustration', () => {
    const { getByText, queryByRole } = render(<TopBanner frontpage={false} showIllustration={false} title="TOPBANNER_TITLE" text="TOPBANNER_TEXT"/>);
    expect(getByText('TOPBANNER_TITLE')).toBeInTheDocument();
    expect(getByText('TOPBANNER_TEXT')).toBeInTheDocument();
    expect(queryByRole('presentation')).toBeNull();
});

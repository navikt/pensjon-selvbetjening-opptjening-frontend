import React from 'react';
import { render, screen } from '@testing-library/react';
import {VeilederMedSnakkeboble} from './VeilederMedSnakkeboble';

it('renders veileder with speech bubble and correct text', () => {
    render(<VeilederMedSnakkeboble veilederText="LORUM IPSUM"/>);
    const displayedImage = document.querySelector("img");
    expect(screen.getByText('LORUM IPSUM')).toBeInTheDocument();
    expect(displayedImage.src).toContain("veileder.svg");
});

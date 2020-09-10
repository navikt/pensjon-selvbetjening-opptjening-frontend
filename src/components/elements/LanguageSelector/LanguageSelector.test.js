import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LanguageSelector} from './LanguageSelector';

it('renders language selector and change language', () => {
    let select = render(<LanguageSelector/>);
    const optionNB = select.getByTestId('option-nb-NO');
    const optionNN = select.getByTestId('option-nn-NO');
    const optionEN = select.getByTestId('option-en-GB');

    fireEvent.change(select.getByTestId("language-selector"), {
        target: {
            value: "en-GB"
        }
    });

    expect(optionNB.selected).toBeFalsy();
    expect(optionNN.selected).toBeFalsy();
    expect(optionEN.selected).toBeTruthy();
});

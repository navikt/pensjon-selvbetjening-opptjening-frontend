import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { LanguageSelector} from './LanguageSelector';

it('renders language selector and change language', () => {
    let select = render(<LanguageSelector/>);
    const optionNB = select.getByTestId('option-nb');
    const optionNN = select.getByTestId('option-nn');
    const optionEN = select.getByTestId('option-en');

    fireEvent.change(select.getByTestId("language-selector"), {
        target: {
            value: "en"
        }
    });

    expect(optionNB.selected).toBeFalsy();
    expect(optionNN.selected).toBeFalsy();
    expect(optionEN.selected).toBeTruthy();
});

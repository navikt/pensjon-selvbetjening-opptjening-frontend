import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { YearSelector} from './YearSelector';

const years = ['2020', '2019', '2018'];
let onChangeInvoked = false;
let onChangeFunction = () => {
    onChangeInvoked = true;
};

it('renders select with options', () => {
    let select = render(<YearSelector years={years} currentYear="2018"/>);

    expect(select.getByTestId("year-selector")).toBeInTheDocument();
    expect(select.getByTestId("option-2020")).toBeInTheDocument();
    expect(select.getByTestId("option-2019")).toBeInTheDocument();
    expect(select.getByTestId("option-2018")).toBeInTheDocument();
    expect(select.queryByTestId("option-1972")).not.toBeInTheDocument();
});

it('renders select and fires passed onChange function', () => {
    let select = render(<YearSelector years={years} currentYear="2018" onChange={onChangeFunction}/>);

    fireEvent.change(select.getByTestId("year-selector"), {
        target: {
            value: "2020"
        }
    });
    expect(onChangeInvoked).toBe(true);
});

it('renders select and sets passed year, 2018,  as selected', () => {
    let select = render(<YearSelector years={years} currentYear="2018" />);
    const option2020 = select.getByTestId('option-2020');
    const option2019 = select.getByTestId('option-2019');
    const option2018 = select.getByTestId('option-2018');

    expect(option2020.selected).toBeFalsy();
    expect(option2019.selected).toBeFalsy();
    expect(option2018.selected).toBeTruthy();
});

it('renders select, fires onchage and sets new selected value to 2019', () => {
    let select = render(<YearSelector years={years} onChange={onChangeFunction}/>);
    const option2020 = select.getByTestId('option-2020');
    const option2019 = select.getByTestId('option-2019');
    const option2018 = select.getByTestId('option-2018');

    fireEvent.change(select.getByTestId("year-selector"), {
        target: {
            value: "2019"
        }
    });
    expect(onChangeInvoked).toBe(true);

    expect(option2020.selected).toBeFalsy();
    expect(option2019.selected).toBeTruthy();
    expect(option2018.selected).toBeFalsy();
});




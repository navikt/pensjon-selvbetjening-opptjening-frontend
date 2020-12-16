import React from 'react';
import { render, screen } from '@testing-library/react';
import {OpptjeningFlereStederPanel} from './OpptjeningFlereStederPanel';
import userEvent from "@testing-library/user-event";

it('should render OpptjeningFlereStederPanel with title and explanation texts', () => {
    render(<OpptjeningFlereStederPanel/>);
    userEvent.click(screen.getByRole("heading"));

    expect(screen.getByRole('heading')).toHaveTextContent("opptjening-flere-steder-title");
    expect(screen.getByText("opptjening-flere-steder-forklart-title")).toBeInTheDocument();
    expect(screen.getByText("opptjening-flere-steder-individuell")).toBeInTheDocument();
    expect(screen.getByText("opptjening-flere-steder-tjenestepensjon")).toBeInTheDocument();
    expect(screen.getByText("opptjening-flere-steder-folketrygden")).toBeInTheDocument();
    expect(screen.getByText("opptjening-flere-steder-forklart")).toBeInTheDocument();

});



import React from 'react';
import { Container, Row, Column } from 'nav-frontend-grid';
import {OpptjeningContainer} from "../../containers/OpptjeningContainer";
import {OpptjeningView} from "../../components/views/OpptjeningView";

export const HomePage = () => {
    return (
        // Move GRID to separate re-usable template
        <Container fluid>
            <Row>
                <Column md="2" xs="12" />
                <Column md="8" xs="12">
                    <OpptjeningContainer>
                        <OpptjeningView/>
                    </OpptjeningContainer>
                </Column>
                <Column md="2" xs="12" />
            </Row>
        </Container>
    )
};

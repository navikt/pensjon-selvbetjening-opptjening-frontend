import React from 'react';
import {connect} from "react-redux";
import logo from './logo.svg';
import './App.css';

function App(props) {
    const {opptjening} = props;
    let oData = opptjening.opptjeningData;
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                Pensjon opptjening:
            </header>
            <div className="App-body">
                First year with opptjening: {opptjening.firstYearWithOpptjening}<br/>
                Last year with opptjening: {opptjening.lastYearWithOpptjening}<br/>
                Number of years with pensjonspoeng: {opptjening.numberOfYearsWithPensjonspoeng}<br/>
                overforOmsorgPossible: {opptjening.overforOmsorgspoengPossible}<br/>
                showRestpensjon: {opptjening.showRestpensjon}<br/>

                <p>Opptjeningsdata:</p>
                {oData && Object.keys(oData).map((year) => {
                    return (
                        <p>
                            År: {oData[year].ar}<br/>
                            Gjennomsnittlig G: {oData[year].gjennomsnittligG}<br/>
                            Hjelpmerknad: {oData[year].hjelpMerknad}<br/>
                            Maks uføregrad: {oData[year].maksUforegrad}<br/>
                            Omsorgspoeng: {oData[year].omsorgspoeng}<br/>
                            Omsorgspoengtype: {oData[year].omsorgspoengType}<br/>
                            Pensjonsbeholdning: {oData[year].pensjonsbeholdning}<br/>
                            Pensjonsgivende inntekt: {oData[year].pensjonsgivendeInntekt}<br/>
                            Pensjonspoeng: {oData[year].pensjonspoeng}<br/>
                            Regoistrerte pensjonspoeng: {oData[year].registrertePensjonspoeng}<br/>
                            Restpensjon: {oData[year].restpensjon}
                        </p>
                    )
                })}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        opptjening: state.opptjening.opptjening
    };
};

export default connect(mapStateToProps)(App);

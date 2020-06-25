import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [opptjening, setOpptjening] = useState({});

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()

    useEffect(() => {
        fetch("/pensjon/opptjening/api/opptjening", {
            method: "GET",
            credentials: "include"
        })
            .then(res => res.json())
            .then(
                (response) => {
                    if (response.status === 401) {
                        setIsLoaded(false);
                        setError("UNAUTHORIZED");
                        window.location.href = "https://loginservice-q.nav.no/login?redirect=https://www-q0.nav.no/pensjon/opptjening/"
                    } else if (response.status === 200) {
                        setIsLoaded(true);
                        setOpptjening(response);
                    } else {
                        setIsLoaded(true);
                        setOpptjening(response);
                    }
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, []);

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
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

}

export default App;

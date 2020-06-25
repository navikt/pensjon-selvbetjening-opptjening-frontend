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
                    <ul>
                        <li>First year with opptjening: {opptjening.firstYearWithOpptjening}</li>
                        <li>Last year with opptjening: {opptjening.lastYearWithOpptjening}</li>
                        <li>Number of years with pensjonspoeng: {opptjening.numberOfYearsWithPensjonspoeng}</li>
                        <li>overforOmsorgPossible: {opptjening.overforOmsorgspoengPossible}</li>
                        <li>showRestpensjon: {opptjening.showRestpensjon}</li>
                    </ul>
                    Opptjeningsdata:
                    {oData && Object.keys(oData).forEach((year) => {
                        return (
                            <ul>
                                <li>{oData[year].ar}</li>
                                <li>{oData[year].gjennomsnittligG}</li>
                                <li>{oData[year].hjelpMerknad}</li>
                                <li>{oData[year].maksUforegrad}</li>
                                <li>{oData[year].omsorgspoeng}</li>
                                <li>{oData[year].omsorgspoengType}</li>
                                <li>{oData[year].pensjonsbeholdning}</li>
                                <li>{oData[year].pensjonsgivendeInntekt}</li>
                                <li>{oData[year].pensjonspoeng}</li>
                                <li>{oData[year].registrertePensjonspoeng}</li>
                                <li>{oData[year].restpensjon}</li>
                            </ul>
                        )
                    })}
                </header>
            </div>
        );
    }

}

export default App;

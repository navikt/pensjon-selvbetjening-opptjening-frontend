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
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    Pensjon Opptjening
                </header>
                <b>First year with opptjening: {opptjening.firstYearWithOpptjening}</b>
                <b>Last year with opptjening: {opptjening.lastYearWithOpptjening}</b>
                <b>Number of years with pensjonspoeng: {opptjening.numberOfYearsWithPensjonspoeng}</b>
                <b>overforOmsorgPossible: {opptjening.overforOmsorgspoengPossible}</b>
                <b>showRestpensjon: {opptjening.showRestpensjon}</b>

                {/*{Object.keys(opptjening.opptjeningData).forEach((year) => {*/}
                {/*    return (*/}
                {/*        <ul>*/}
                {/*            <li>{year.ar}</li>*/}
                {/*            <li>{year.gjennomsnittligG}</li>*/}
                {/*            <li>{year.hjelpMerknad}</li>*/}
                {/*            <li>{year.maksUforegrad}</li>*/}
                {/*            <li>{year.omsorgspoeng}</li>*/}
                {/*            <li>{year.omsorgspoengType}</li>*/}
                {/*            <li>{year.pensjonsbeholdning}</li>*/}
                {/*            <li>{year.pensjonsgivendeInntekt}</li>*/}
                {/*            <li>{year.pensjonspoeng}</li>*/}
                {/*            <li>{year.registrertePensjonspoeng}</li>*/}
                {/*            <li>{year.restpensjon}</li>*/}
                {/*        </ul>*/}
                {/*    )*/}
                {/*})}*/}
            </div>
        );
    }

}

export default App;

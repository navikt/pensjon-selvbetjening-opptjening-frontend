import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [opptjening, setOpptjening] = useState([]);

    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()

    useEffect(() => {
        fetch("/pensjon/opptjening/api/opptjening/pensjonspoeng/23115225588", {
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
                        setOpptjening(response.pensjonspoeng);
                    } else {
                        setIsLoaded(true);
                        setOpptjening(response.pensjonspoeng);
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
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                    <ul>
                        {opptjening.map(pensjonspoeng => (
                            <li>
                                {pensjonspoeng.fnr}
                            </li>
                        ))}
                    </ul>
                </header>
            </div>
        );
    }

    // if (isLoaded && opptjening && opptjening.pensjonspoeng && opptjening.pensjonspoeng[0]) {
    //     return (
    //         <div className="App">
    //             <header className="App-header">
    //                 <img src={logo} className="App-logo" alt="logo"/>
    //                 <p>
    //                     Edit <code>src/App.js</code> and save to reload.
    //                 </p>
    //                 <a
    //                     className="App-link"
    //                     href="https://reactjs.org"
    //                     target="_blank"
    //                     rel="noopener noreferrer"
    //                 >
    //                     Learn React
    //                 </a>
    //                 {opptjening.pensjonspoeng[0].fnr}
    //             </header>
    //         </div>
    //     );
    // } else if (error) {
    //     return (<div>{error}</div>);
    // } else {
    //     return (<div>LOADING</div>);
    // }
}

export default App;

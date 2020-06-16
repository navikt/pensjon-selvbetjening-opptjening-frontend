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
    fetch("/api/opptjening/123456", {
      method: "GET"
    })
        .then(res => res.json())
        .then(
            (result) => {
              setIsLoaded(true);
              setOpptjening(result);
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

    if (isLoaded && opptjening.fnr) {
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
                    {opptjening.fnr}: {opptjening.inntekt}
                </header>
            </div>
        );
    } else if (error){
        return(<div>{error}</div>);
    } else {
        return(<div>LOADING</div>);
    }
}

export default App;

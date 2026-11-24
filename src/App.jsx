import './App.css';
import axios from 'axios';
import {useState} from "react";
import {getCountryColor} from './helpers/helpers.js';
import worldMap from './assets/world_map.png';

function App() {
    const [countries, setCountries] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [error, toggleError] = useState(false);

    async function fetchCountries() {
        try {
            toggleLoading(true);
            toggleError(false);
            const response = await axios.get('https://countries.dev/countries?fields=name%2Ccapital%2Cflag&full=true&sort=population&limit=250&offset=0');
            console.log(response.data);
            setCountries(response.data);
        } catch (error) {
            console.error(error);
            toggleError(true);
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <>
            <header>
                <div className="inner-container">
                    <img src={worldMap} alt="world map"/>
                    <h1>World regions</h1>
                </div>
            </header>
            <main>
                <section className="control-buttons">
                    <div className="inner-container">
                        <button type="button" onClick={fetchCountries} className="button">Haal landen op</button>
                    </div>
                </section>
                <section className="content">
                    <div className="inner-container">
                        {error && <p>Er is helaas iets misgegaan. Probeer het nog eens!</p>}
                        {loading && <p>Loading...</p>}
                        {countries && <ul className="countries-list">
                            {countries.map((country) => {
                                    const colorClass = getCountryColor(country.region);

                                    return (

                                        <li key={country.name} className={colorClass}>
                                            <h3>{country.name}</h3>
                                            Has a population of {country.population} people
                                            {country.flags.png && <img src={country.flags.png} alt={country.name}/>}

                                        </li>
                                    );
                                }
                            )}
                        </ul>}
                    </div>
                </section>
            </main>
        </>
    )
}

export default App

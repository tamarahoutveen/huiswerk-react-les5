import './App.css';
import axios from 'axios';
import {useState} from "react";
import {getCountryColor} from './helpers/helpers.js';
import worldMap from './assets/world_map.png';
import CompactCountryCard from "./components/CompactCountryCard/CompactCountryCard.jsx";
import CountryCard from "./components/CountryCard/CountryCard.jsx";

function App() {
    const [countrySearch, setCountrySearch] = useState({
        searchValue: "",
        result: {},
        loading: false,
        error: false,
    });
    const [countries, setCountries] = useState({
        result: [],
        loading: false,
        error: false,
    });

    async function fetchCountries() {
        try {
            setCountries({
                ...countries,
                loading:true,
                error: false,
            });
            const response = await axios.get('https://countries.dev/countries?fields=name%2Ccapital%2Cflag&full=true&sort=population&limit=250&offset=0');
            console.log(response.data);
            setCountries({
                ...countries,
                loading: false,
                error: false,
                result: response.data,
            });

        } catch (error) {
            console.error(error);
            setCountries({
                ...countries,
                loading: false,
                error: true,
            });
        }
    }

    async function handleCountrySearch(event) {
        event.preventDefault();
        const searchLink = "https://countries.dev/name/" + countrySearch.searchValue;

        try {
            setCountrySearch({
                ...countrySearch,
                loading: true,
                error: false,
            });

            const response = await axios.get(searchLink);
            //console.log("response.data[0]:", response.data[0]);

            setCountrySearch({
                ...countrySearch,
                result: response.data[0],
                loading: false,
                error: false,
                searchValue: "",
            });
        } catch (error) {
            console.error(error);
            setCountrySearch({
                ...countrySearch,
                error: true,
                loading: false,
                result: "",
            });
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
                <section className="content">
                    <div className="inner-container">
                        {countries.result.length === 0 &&
                            <button type="button" onClick={fetchCountries} className="button" id="countries-button">Get
                                countries</button>}

                        {countries.error && <p>Something has gone wrong! Please try it again.</p>}
                        {countries.loading && <p>Loading countries...</p>}
                        {countries.result && <ul className="countries-list">
                            {countries.result.map((country) => {
                                    const colorClass = getCountryColor(country.region);

                                    return (
                                        <CompactCountryCard
                                            key={country.name}
                                            countryName={country.name}
                                            countryFlag={country.flags.png}
                                            countryColor={colorClass}
                                            countryPopulation={country.population}
                                        />
                                    );
                                }
                            )}
                        </ul>}
                    </div>
                </section>
                <section className="country-info">
                    <div className="inner-container">
                        <h2>Search country information</h2>
                        <form className="search-form" onSubmit={handleCountrySearch}>
                            <input
                                type="text"
                                id="country-input"
                                value={countrySearch.searchValue}
                                onChange={(e) => setCountrySearch({...countrySearch, searchValue: e.target.value, error:false, loading:false})}
                                placeholder="For example The Netherlands or Peru"
                            />
                            <button type="submit" className="search-button">Search</button>
                        </form>
                        {countrySearch.error && <p>{countrySearch.searchValue} doesn&apos;t exist. Please try again.</p>}
                        {countrySearch.loading && <p>Loading the search result...</p>}
                        {countrySearch.result?.name && !countrySearch.error && !countrySearch.loading && (
                            <>
                                <p>Results for: {countrySearch.result.name}</p>
                                <CountryCard
                                    countryName={countrySearch.result.name}
                                    countryPopulation={countrySearch.result.population}
                                    countryCapital={countrySearch.result.capital}
                                    countryRegion={countrySearch.result.subregion}
                                    countryBorders={countrySearch.result.borders}
                                    countryFlag={countrySearch.result.flags.png}
                                    countryDomains={countrySearch.result.topLevelDomain}
                                />
                            </>
                        )}
                    </div>
                </section>
            </main>
        </>
    )
}

export default App

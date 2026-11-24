import './CountryCard.css';
import {formatPopulation} from "../../helpers/helpers.js";

function CountryCard({countryName, countryFlag, countryRegion, countryCapital, countryPopulation, countryBorders, countryDomains}) {

    return (
        <article className="country-card">
            {countryFlag && <img src={countryFlag} alt={countryName}/>}
            <span className="country-card-info">
            <h3>{countryName}</h3>
            <p>
                {countryName} is situated in {countryRegion} and the capital is {countryCapital}.
                It has a population of {formatPopulation(countryPopulation)} people and it borders with {countryBorders?.length ?? 0} neighboring countries.
                Websites can be found on {Array.isArray(countryDomains) ? countryDomains.join(", ") : countryDomains} domain&apos;s.
            </p>
            </span>
        </article>
    )
}
export default CountryCard;
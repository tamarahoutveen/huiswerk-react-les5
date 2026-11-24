import './CompactCountryCard.css';
import {formatPopulation} from "../../helpers/helpers.js";

function CompactCountryCard({countryName, countryColor, countryFlag, countryPopulation}) {
    return (
        <li className={countryColor}>
            {countryFlag && <img src={countryFlag} alt={countryName}/>}
            <span><h3>{countryName}</h3>
Has a population of {formatPopulation(countryPopulation)} people</span>
        </li>
    )
}
export default CompactCountryCard;
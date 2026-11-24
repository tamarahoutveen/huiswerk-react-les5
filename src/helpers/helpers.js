export function getCountryColor(region) {
    let countryColor;
    switch (region) {
        case "Africa":
            countryColor = "blue";
            break;
        case "Americas":
            countryColor = "green";
            break;
        case "Asia":
            countryColor = "red";
            break;
        case "Europe":
            countryColor = "yellow";
            break;
        case "Oceania":
            countryColor = "purple";
            break;
        default:
            countryColor = "black";
            break;
    }
return countryColor;
}

export default getCountryColor;
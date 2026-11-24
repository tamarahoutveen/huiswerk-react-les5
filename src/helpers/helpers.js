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
export function formatPopulation(population) {

    if (population >= 1000000000){
        let billions = Math.round(population / 1000000);
       billions = new Intl.NumberFormat("nl-NL", {
           maximumFractionDigits: 0,
       }).format(billions);
       return `${billions} billion`;
    }
    else if (population >= 1000000){
        const millions = Math.round(population / 1000000);
        return `${millions} million`;
    }

    return new Intl.NumberFormat("nl-NL", {
        maximumFractionDigits: 0,
    }).format(population);
}

export default getCountryColor;
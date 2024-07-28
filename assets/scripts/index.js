const result = document.querySelector("#result"); 
const searchBtn = document.querySelector("#searchBtn");
const countryInp = document.querySelector("#countryInp");

const loader = "<div>Loading...</div>";
const Exist = "<p style='text-align:center; font-size: 20px; margin-top: 30px'>This country does not exist</p>";

searchBtn.addEventListener("click", () => {
    let countryName = countryInp.value;
    if (countryName) {
        
        result.innerHTML = loader;

        let URL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
        console.log(URL);
        fetch(URL).then((response) => {
            response.json().then((data) => {
                let countryData = data[0];
                console.log(countryData);
                console.log(countryData.name.common);
                console.log(countryData.capital);
                console.log(countryData.population);
                console.log(countryData.flags.svg);
                console.log(countryData.continents[0]);

                console.log(countryData.currencies[Object.keys(countryData.currencies)].name);
                console.log(Object.values(countryData.languages).toString().split(",").join(", "));

                result.innerHTML = uiResult(countryData);
                countryInp.value = "";
            });
        }).catch(error => {
            console.error('Error fetching data:', error);
            result.innerHTML = "<p>Failed to fetch country data</p>";
        });
    } else {
        result.innerHTML = Exist;
    } if (countryInp.value === "") {
        result.innerHTML = "<p style='text-align:center; font-size: 20px; margin-top: 30px'>Please, fill in the field</p>";
    }
}); 



let uiResult = (data) => {
    return `
            <img class='imageous' src="${data.flags.svg}" alt="flag">
            <h2 style='text-align: center;'>${data.name.common}</h2>
            <span>Capital: ${data.capital}</span>
            <span>Continent: ${data.continents[0]}</span>
            <span>Population: ${data.population}</span>
            <span>Currency: ${data.currencies[Object.keys(data.currencies)].name}</span>
            <span>Language: ${Object.values(data.languages).toString().split(",").join(", ")}</span>
    `
};




// fetch() get data from a resource from the network.
// json() decode them
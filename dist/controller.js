const renderer = new Render();
const weatherModel = new WeatherModel();


async function renderSavedData() {
    const cityData = await weatherModel.getCityData(cityName);
    renderer.display(cityData);
}


// async function renderCityWeather(cityName) {
//     const cityData = await weatherModel.getCityData(cityName);
//     renderer.display(cityData);
// }

async function search (){
    const input = $("#searchInput").val(); 
     await weatherModel.getCityData(input);
    renderer.display(weatherModel.cities);
}


async function save() {
    const cityName = $(".save-button").data("city");
    await weatherModel.saveCityData(cityName);

    alert(`Data for ${cityName} saved to the database successfully!`);
}

async function remove(){
    const cityName = $(".remove-button").data("city");
    console.log(cityName)
    await weatherModel.deleteCity(cityName);

    alert(`Data for ${cityName} removed to the database successfully!`);
}









$(document).ready(renderSavedData);

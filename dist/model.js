class WeatherModel {

  constructor() {
      this.cities = [];
  }

  async getAllCities() {
      try {
          const response = await fetch('/cities');
          const cities = await response.json();
          this.cities = cities;
      } catch (error) {
          console.error('Error fetching cities:', error);
      }
  }

  async getCityData(cityName) {
    try {
      const response = await fetch(`/weather/${cityName}`);
      const cityData = await response.json();
      console.log(cityData.type)
      this.cities.push(cityData)


    } catch (error) {
      console.error(`Error fetching city data for ${cityName}:`, error);
      console.error('Response content:', await response.text()); 
    }
  }
  
  async saveCityData(cityData) {
      try {
          const response = await fetch('/cities', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(cityData),
          });
          const savedCity = await response.json();
          this.cities.push(savedCity);
      } catch (error) {
          console.error('Error saving city data:', error);
      }
  }

  async deleteCity(cityName) {
      try {
          const response = await fetch(`/weather/${cityName}`, {
              method: 'DELETE',
          });
          if (response.ok) {
              this.cities = this.cities.filter(city => city.name == cityName);
          } else {
              console.error('City deletion failed:', response.statusText);
          }
      } catch (error) {
          console.error('Error deleting city:', error);
      }
  }
}



import http from "../http-common";

class WeatherDataService {
  getAll() {
    return http.get("/weatherData");
  }
  
  getWeek(fromDay, toDay, lat, lon) {
    return http.post(`/weatherData/getWeek`, {
      lat: lat,
      lon: lon,
      from: fromDay,
      to: toDay
    })
  }
  getCurrentDay() {
    return http.post("/weatherData/getCurrentDay");
  }
  
}

export default new WeatherDataService();
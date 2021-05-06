import http from "../http-common";

class WeatherDataService {
  getAll() {
    return http.get("/weatherData");
  }

  get(id) {
    return http.get(`/weatherData/${id}`);
  }

  create(data) {
    return http.post("/weatherData", data);
  }

  update(id, data) {
    return http.put(`/weatherData/${id}`, data);
  }

  delete(id) {
    return http.delete(`/weatherData/${id}`);
  }

  deleteAll() {
    return http.delete(`/weatherData`);
  }

  findByTitle(title) {
    return http.get(`/weatherData?title=${title}`);
  }
}

export default new WeatherDataService();
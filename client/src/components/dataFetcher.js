import WeatherDataService from '../services/weather.service.js'
class dataFetcher {
    getWeek(fromDay, toDay) {
        WeatherDataService.getWeek(fromDay, toDay)
        .then(data => {
            console.log(data);
        })
    }
}

export default new DataFetcher();
import { WeatherDataController } from "../controllers/weatherDataController"

export class Routes {
  public routes(app): void {
    app.route('/data/getall').get(WeatherDataController.getAllData)
    app.route('/data/:startDate&:endDate').get(WeatherDataController.getByDates)
    app.route('/data/currentweather').get(WeatherDataController.getCurrentWeather)
    }
}

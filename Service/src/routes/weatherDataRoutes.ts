import {Request, Response} from "express";
import { WeatherDataController } from "../controllers/weatherDataController"

export class Routes {
  public routes(app): void {
    app.route('/').get(WeatherDataController.getValue)

    app.route('/data/:startDate&:endDate').get(WeatherDataController.getByDates)
    }
}

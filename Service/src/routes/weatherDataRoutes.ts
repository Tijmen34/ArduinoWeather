import {Request, Response} from "express";
import { WeatherDataController } from "../controllers/weatherDataController"

export class Routes {
  public weatherDataController: WeatherDataController = new WeatherDataController();

  public routes(app): void {

    app.route('/').get(this.weatherDataController.getValue)

    app.route('/data/:startDate&:endDate')
    .get((req: Request, res: Response) => {
      var startDate = req.params.startDate
      var endDate = req.params.endDate
      res.status(200).send({
        message: "Successfully done request!",
        startDate,
        endDate
      })
    })
  }
}

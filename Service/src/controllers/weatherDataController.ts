import { Request, Response } from 'express';
import connection from '../databases/database'

export class WeatherDataController {
  private dbConnection;

  constructor() {
    this.dbConnection = connection;
  }

  public getValue(req: Request, res: Response) {
    let bmp280;
    try {
      bmp280 = this.dbConnection.getValue();
    } finally {
      res.json(bmp280)
    }
  }
}

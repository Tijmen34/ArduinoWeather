import { Request, Response } from 'express';
import connection from '../databases/database'

export const WeatherDataController = {
  getByDates: function (request, response) {
    const bmp280 = connection.query("SELECT * FROM bmp280 WHERE id = 1")
    return response.json(bmp280)
  },

  getValue: function (request, response) {
    const bmp280 = connection.query("SELECT * FROM bmp280 WHERE id = 3")
    return response.json(bmp280)
  }
}

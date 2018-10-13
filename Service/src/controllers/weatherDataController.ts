import { Request, Response } from 'express';
import connection from '../databases/database'

export const WeatherDataController = {
  getByDates: function(request, response) {
    connection.getConnection((err, conn) => {
      if (err){
        response.json(err);
      } else {
        conn.query("SELECT * FROM bmp280 WHERE id = 1", (err, rows) => {
          if (err) {
            response.json(err)
          } else {
            response.json(rows)
          }
        })
      }
    })
  },

  getValue: function(request, response) {
    connection.getConnection((err, conn) => {
      if (err){
        response.json(err);
      } else {
        conn.query("SELECT * FROM bmp280 WHERE id = 8493", (err, rows) => {
          if (err) {
            response.json(err)
          } else {
            response.json(rows)
          }
        })
      }
    })
  }
}

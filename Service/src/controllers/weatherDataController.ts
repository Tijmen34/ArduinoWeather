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
        conn.query("SELECT * FROM bmp280 WHERE timestamp BETWEEN '2018-10-10 22:00:00' AND '2018-10-10 23:00:00';" +
        "SELECT * FROM dht11 WHERE timestamp BETWEEN '2018-10-10 22:00:00' AND '2018-10-10 23:00:00';" +
        "SELECT * FROM openweather WHERE timestamp BETWEEN '2018-10-10 22:00:00' AND '2018-10-10 23:00:00';" +
        "SELECT * FROM ds18b20 WHERE timestamp BETWEEN '2018-10-10 22:00:00' AND '2018-10-10 23:00:00';"
        , (err, rows) => {
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

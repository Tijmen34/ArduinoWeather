import { Request, Response } from 'express';
import connection from '../databases/database'

export const WeatherDataController = {
  getByDates: function(request, response) {
    connection.getConnection((err, conn) => {
      if (err) {
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
      if (err) {
        response.json(err);
      } else {
        let bmp280, dht11, ds18b20, openweather;
        conn.query("SELECT * FROM bmp280 WHERE timestamp BETWEEN '2018-10-10 22:00:00' AND '2018-10-10 23:00:00'", (err, rows, fields) => {
          if (err) {
            response.json(err)
          } else {
            bmp280 = {}
            bmp280[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM dht11 WHERE timestamp BETWEEN '2018-10-10 22:00:00' AND '2018-10-10 23:00:00'", (err, rows, fields) => {
          if (err) {
            response.json(err)
          } else {
            dht11 = {}
            dht11[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM ds18b20 WHERE timestamp BETWEEN '2018-10-10 22:00:00' AND '2018-10-10 23:00:00'", (err, rows, fields) => {
          if (err) {
            response.json(err)
          } else {
            ds18b20 = {}
            ds18b20[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM openweather WHERE timestamp BETWEEN '2018-10-10 22:00:00' AND '2018-10-10 23:00:00'", (err, rows, fields) => {
          if (err) {
            response.json(err)
          } else {
            openweather = {}
            openweather[fields[0].table] = rows
            response.json([bmp280, ds18b20, dht11, openweather])
          }
        })
      }
    })
  }
}

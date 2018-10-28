import { Request, Response } from 'express';
import connection from '../databases/database'

export const WeatherDataController = {
  getByDates: function(request, response) {
    const startDate = request.params.startDate
    const endDate = request.params.endDate
    connection.getConnection((err, conn) => {
      if (err) {
        response.json(err);
        return;
      } else {
        let bmp280, dht11, ds18b20, openweather;
        conn.query("SELECT * FROM bmp280 WHERE timestamp BETWEEN ? AND ?", [startDate, endDate], (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
          } else {
            bmp280 = {}
            bmp280[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM dht11 WHERE timestamp BETWEEN ? AND ?", [startDate, endDate], (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
          } else {
            dht11 = {}
            dht11[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM ds18b20 WHERE timestamp BETWEEN ? AND ?", [startDate, endDate], (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
          } else {
            ds18b20 = {}
            ds18b20[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM openweather WHERE timestamp BETWEEN ? AND ?", [startDate, endDate], (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
          } else {
            openweather = {}
            openweather[fields[0].table] = rows
            response.json([bmp280, ds18b20, dht11, openweather])
          }
        })
      }
    })
  },

  getAllData: function(request, response) {
    connection.getConnection((err, conn) => {
      if (err) {
        response.json(err);
        return;
      } else {
        let bmp280, dht11, ds18b20, openweather;
        conn.query("SELECT * FROM bmp280", (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
          } else {
            bmp280 = {}
            bmp280[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM dht11", (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
          } else {
            dht11 = {}
            dht11[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM ds18b20", (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
          } else {
            ds18b20 = {}
            ds18b20[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM openweather", (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
          } else {
            openweather = {}
            openweather[fields[0].table] = rows
            response.json([bmp280, ds18b20, dht11, openweather])
          }
        })
      }
    })
  },

  getCurrentWeather: function(request, response) {
    connection.getConnection((err, conn) => {
      if (err) {
        response.json(err);
        return;
      } else {
        let bmp280, dht11, ds18b20, openweather;
        conn.query("SELECT * FROM bmp280 WHERE id = (SELECT MAX(id) FROM bmp280)", (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
          } else {
            bmp280 = {}
            bmp280[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM dht11 WHERE id = (SELECT MAX(id) FROM dht11)", (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
          } else {
            dht11 = {}
            dht11[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM ds18b20 WHERE id = (SELECT MAX(id) FROM ds18b20)", (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
          } else {
            ds18b20 = {}
            ds18b20[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM openweather WHERE id = (SELECT MAX(id) FROM openweather)", (err, rows, fields) => {
          if (err) {
            response.json(err)
            return;
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

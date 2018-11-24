import { Request, Response } from 'express';
import connection from '../database/database'
import {BMP280} from "../model/BMP280";
import {throws} from "assert";

export const WeatherDataController = {
  getByDates: function(request, response) {
    const startDate = request.params.startDate
    const endDate = request.params.endDate
    connection.getConnection((err, conn) => {
      if (err) {
        response.json(err);
      } else {
        let bmp280, dht11, ds18b20, openweather;
        conn.query("SELECT * FROM bmp280 WHERE timestamp BETWEEN '?' AND '?'", [startDate, endDate], (err, rows, fields) => {
          if (err) {
            response.json(err)
          } else {
            bmp280 = {}
            bmp280[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM dht11 WHERE timestamp BETWEEN '?' AND '?'", [startDate, endDate], (err, rows, fields) => {
          if (err) {
            response.json(err)
          } else {
            dht11 = {}
            dht11[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM ds18b20 WHERE timestamp BETWEEN '?' AND '?'", [startDate, endDate], (err, rows, fields) => {
          if (err) {
            response.json(err)
          } else {
            ds18b20 = {}
            ds18b20[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM openweather WHERE timestamp BETWEEN '?' AND '?'", [startDate, endDate], (err, rows, fields) => {
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
  },

  getAllData: function(request, response) {
    connection.getConnection((err, conn) => {
      if (err) {
        response.json(err);
      } else {
        let bmp280, dht11, ds18b20, openweather;
        conn.query("SELECT * FROM bmp280", (err, rows, fields) => {
          if (err) {
            response.json(err)
          } else {
            bmp280 = {}
            bmp280[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM dht11", (err, rows, fields) => {
          if (err) {
            response.json(err)
          } else {
            dht11 = {}
            dht11[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM ds18b20", (err, rows, fields) => {
          if (err) {
            response.json(err)
          } else {
            ds18b20 = {}
            ds18b20[fields[0].table] = rows
          }
        })
        conn.query("SELECT * FROM openweather", (err, rows, fields) => {
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
  },
    getExperimentalData: (request, response) => {
      BMP280
          .findAll({
              limit: 1,
              order: [ [ 'id', 'DESC' ] ]
          })
          .then((lottaData) => {
            response.json({}["BMP280"] = lottaData[0])
          })
          .catch((err) => {
            response.json(err)
          })
    }
};

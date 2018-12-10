import { Request, Response } from 'express';
import connection from '../database/database'
import { BMP280 } from "../model/BMP280";
import { Openweather } from "../model/Openweather";
import { DHT11 } from "../model/DHT11";
import { DS18B20 } from "../model/DS18B20";
import { throws } from "assert";

export const WeatherDataController = {
  getByDates: function(request, response) {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Methods', 'GET');
    response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
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
  },

  getCurrentWeather2: (request, response) => {
    const startDate = request.params.startDate;
    const endDate = request.params.endDate;

    const bmp280Promise = BMP280.findAll({
      where: {
        timestamp: {
          $between: [startDate, endDate]
        }
      }
    })

    const dht11Promise = DHT11.findAll({
      where: {
        timestamp: {
          $between: [startDate, endDate]
        }
      }
    })

    const openweatherPromise = Openweather.findAll({
      where: {
        timestamp: {
          $between: [startDate, endDate]
        }
      }
    })

    const ds18b20Promise = DS18B20.findAll({
      where: {
        timestamp: {
          $between: [startDate, endDate]
        }
      }
    })

    Promise.all([
      bmp280Promise,
      dht11Promise,
      openweatherPromise,
      ds18b20Promise])
      .then(sqlResults => {
        response.json(sqlResults)
      })
      .catch(err => {
        response.status(500).json({ error: err });
      })

    // const bmp280Promise = BMP280.findAll({
    //   where: {
    //     timestamp: {
    //       $between: [startDate, endDate]
    //     }
    //   }
    // })
    //   .then((bmp280Rows) => {
    //       response.json(bmp280Rows)
    //   })
    //   .catch((err) => {
    //     response.status(500).json({ error: err });
    //   })
  },

  getExperimentalData: (request, response) => {
    BMP280
      .findAll({
        limit: 1,
        order: [['id', 'DESC']]
      })
      .then((lottaData) => {
        response.json({}["BMP280"] = lottaData[0])
      })
      .catch((err) => {
        response.json(err)
      })
  }
};

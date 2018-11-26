import datetime
import json
import time

import requests
import mysql.connector
import serial

db = mysql.connector.connect(host="127.0.0.1",
                             user="",
                             password="",
                             db="internetofthings")

ser = serial.Serial('/dev/ttyUSB0', 9600)
time.sleep(0.5)

request_params = {'q': '', 'APPID': ''}
openweather_url = 'http://api.openweathermap.org/data/2.5/weather'


def insertSensorData(sensorJson, outerWeatherData):
    cursor = db.cursor()
    if outerWeatherData is None:
        try:
            cursor.execute("INSERT INTO bmp280 (temperature, altitude, pressure) VALUES (%s, %s, %s)",
                           (sensorJson["bmp280"]["temperature"], sensorJson["bmp280"]["altitude"],
                            sensorJson["bmp280"]["pressure"]))
            cursor.execute("INSERT INTO dht11 (temperature, humidity) VALUES (%s, %s)",
                           (sensorJson["dht11"]["temperature"], sensorJson["dht11"]["humidity"]))
            cursor.execute("INSERT INTO ds18b20 (temperature) VALUES (%s)",
                           (("{:.2f}".format(sensorJson["ds18b20"])),))
            db.commit()
        except mysql.connector.Error:
            print("Failed to insert data into MySQL!")
            raise
        else:
            print("Completed insert (without OpenWeather) at", time.strftime(format))

    else:
        try:
            cursor.execute("INSERT INTO bmp280 (temperature, altitude, pressure) VALUES (%s, %s, %s)",
                           (sensorJson["bmp280"]["temperature"], sensorJson["bmp280"]["altitude"],
                            sensorJson["bmp280"]["pressure"]))
            cursor.execute("INSERT INTO dht11 (temperature, humidity) VALUES (%s, %s)",
                           (sensorJson["dht11"]["temperature"], sensorJson["dht11"]["humidity"]))
            cursor.execute("INSERT INTO ds18b20 (temperature) VALUES (%s)",
                           (("{:.2f}".format(sensorJson["ds18b20"])),))
            cursor.execute("INSERT INTO openweather (temperature, pressure, humidity) VALUES (%s, %s, %s)",
                           (("{:.2f}".format(outerWeatherData["main"]["temp"] - 273.15)),
                            outerWeatherData["main"]["pressure"],
                            outerWeatherData["main"]["humidity"]))
            db.commit()
        except mysql.connector.Error:
            print("Failed to insert data into MySQL!")
            raise
        else:
            print("Completed insert at", time.strftime(format))


def retrieveSerialData(serial):
    try:
        serial_output = ser.readline()
    except (serial.SerialException, TypeError):
        raise
    else:
        serial_output_decoded = serial_output.decode("utf-8")
        return json.loads(serial_output_decoded)


while True:
    try:
        jsonData = retrieveSerialData(ser)
    except serial.SerialException as e:
        print("Failed to read serial with error: ", e)  # In case of serial reading failure
    except TypeError as e:
        print("Failed to find USB with error: ", e)  # In case of no USB found
    else:
        try:
            request = requests.get(openweather_url, params=request_params)
        except requests.exceptions.RequestException as e:
            print("Failed to perform HTTP request with error: ", e)
        else:
            requestData = request.json()
            try:
                insertSensorData(jsonData, requestData)
            except mysql.connector.Error as e:
                print(e)

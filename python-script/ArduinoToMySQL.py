import datetime
import json
import time

import requests
import mysql.connector
import serial

#Import config file
with open('config.json') as configJson:
    configData = json.load(configJson)


#Fill your database information in here.
db = mysql.connector.connect(host=configData['database']['host'],
                             user=configData['database']['user'],
                             password=configData['database']['password'],
                             db=configData['database']['database'])

ser = serial.Serial('/dev/ttyUSB0', 9600)
time.sleep(0.5)

request_params = {'q': configData['openweather']['location'], 'APPID': configData['openweather']['token']} #Add your own Openweather data here.
openweather_url = 'http://api.openweathermap.org/data/2.5/weather'


def insertSensorData(sensorJson, outerWeatherData):
    cursor = db.cursor()
    if outerWeatherData is None:
        try:
            cursor.execute("INSERT INTO BMP280 (temperature, altitude, pressure) VALUES (%s, %s, %s)",
                           (sensorJson["bmp280"]["temperature"], sensorJson["bmp280"]["altitude"],
                            sensorJson["bmp280"]["pressure"]))
            cursor.execute("INSERT INTO DHT11 (temperature, humidity) VALUES (%s, %s)",
                           (sensorJson["dht11"]["temperature"], sensorJson["dht11"]["humidity"]))
            cursor.execute("INSERT INTO DS18B20 (temperature) VALUES (%s)",
                           (("{:.2f}".format(sensorJson["ds18b20"])),))
            db.commit()
        except mysql.connector.Error:
            print("Failed to insert data into MySQL!")
            raise
        else:
            print("Completed insert (without OpenWeather) at", datetime.datetime.now())

    else:
        try:
            cursor.execute("INSERT INTO BMP280 (temperature, altitude, pressure) VALUES (%s, %s, %s)",
                           (sensorJson["bmp280"]["temperature"], sensorJson["bmp280"]["altitude"],
                            sensorJson["bmp280"]["pressure"]))
            cursor.execute("INSERT INTO DHT11 (temperature, humidity) VALUES (%s, %s)",
                           (sensorJson["dht11"]["temperature"], sensorJson["dht11"]["humidity"]))
            cursor.execute("INSERT INTO DS18B20 (temperature) VALUES (%s)",
                           (("{:.2f}".format(sensorJson["ds18b20"])),))
            cursor.execute("INSERT INTO Openweather (temperature, pressure, humidity) VALUES (%s, %s, %s)",
                           (("{:.2f}".format(outerWeatherData["main"]["temp"] - 273.15)),
                            outerWeatherData["main"]["pressure"],
                            outerWeatherData["main"]["humidity"]))
            db.commit()
        except mysql.connector.Error:
            print("Failed to insert data into MySQL!")
            raise
        else:
            print("Completed insert at", datetime.datetime.now())


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
            request.raise_for_status()
        except requests.exceptions.HTTPError as e:
            print("Failed to perform the HTTP request with error: ", e)
            try:
                insertSensorData(jsonData, None)
            except mysql.connector.Error as e:
                print(e)
        except requests.exceptions.RequestException as e:
            print("Something went wrong... ", e)
            try:
                insertSensorData(jsonData, None)
            except mysql.connector.Error as e:
                print(e)
        else:
            requestData = request.json()
            try:
                insertSensorData(jsonData, requestData)
            except mysql.connector.Error as e:
                print(e)

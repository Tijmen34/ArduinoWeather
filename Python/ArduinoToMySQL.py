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

requestparams = {'q': '', 'APPID': ''}
openweatherurl = 'http://api.openweathermap.org/data/2.5/weather'


def insertsensordata(sensorJson):
    request = requests.get(openweatherurl, params=requestparams)
    requestData = request.json()
    cursor = db.cursor()

    try:
        try:
            cursor.execute("INSERT INTO bmp280 (temperature, altitude, pressure) VALUES (%s, %s, %s)",
                           (sensorJson["bmp280"]["temperature"], sensorJson["bmp280"]["altitude"],
                            sensorJson["bmp280"]["pressure"]))
            cursor.execute("INSERT INTO dht11 (temperature, humidity) VALUES (%s, %s)",
                           (sensorJson["dht11"]["temperature"], sensorJson["dht11"]["humidity"]))
            cursor.execute("INSERT INTO ds18b20 (temperature) VALUES (%s)",
                           (("{:.2f}".format(sensorJson["ds18b20"])),))
            cursor.execute("INSERT INTO openweather (temperature, pressure, humidity) VALUES (%s, %s, %s)",
                           (("{:.2f}".format(requestData["main"]["temp"] - 273.15)), requestData["main"]["pressure"],
                            requestData["main"]["humidity"]))
            db.commit()
            print("Data inserted at ", datetime.datetime.now())
        except mysql.connector.Error as e:
            print(e)
            return None
    finally:
        return


while True:
    serialOutput = ser.readline()
    serialOutputDecoded = serialOutput.decode("utf-8")
    jsonData = json.loads(serialOutputDecoded)
    insertsensordata(jsonData)

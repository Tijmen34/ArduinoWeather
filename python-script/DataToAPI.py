import datetime
import json
import time

import requests
import serial

# Import config file
with open('config.json') as configJson:
    configData = json.load(configJson)

ser = serial.Serial('/dev/ttyUSB0', 9600)
time.sleep(0.5)

# Create Openweathermap request parameters, containing the location and API token
openweather_request_params = {'q': configData['openweathermap']['location'],
                              'APPID': configData['openweathermap']['token']}

# Define URLs to call
openweather_url = 'http://api.openweathermap.org/data/2.5/weather'
backend_url = configData['backend-url']


# Function that posts the sensor + openweathermap data
def postSensorData(sensor_json, outer_weather_data):
    if outer_weather_data is None:
        try:
            params_without_openweather = {
                'BMP280': {
                    'temperature': sensor_json["bmp280"]["temperature"],
                    'altitude': sensor_json["bmp280"]["altitude"],
                    'pressure': sensor_json["bmp280"]["pressure"]
                },
                'DHT11': {
                    'temperature': sensor_json["dht11"]["temperature"],
                    'humidity': sensor_json["dht11"]["humidity"]
                },
                'DS18B20': {
                    'temperature': sensor_json["ds18b20"]
                }
            }

            backend_request = requests.post(backend_url, json=params_without_openweather)
            backend_request.raise_for_status()
        except requests.exceptions.HTTPError:
            print("Failed to perform the HTTP request to the backend!")
            raise
        except requests.exceptions.RequestException:
            print("Something went wrong during backend request...")
            raise
        else:
            print("Completed post (without OpenWeather) at", datetime.datetime.now())

    else:
        try:
            params_with_openweather = {
                'BMP280': {
                    'temperature': sensor_json["bmp280"]["temperature"],
                    'altitude': sensor_json["bmp280"]["altitude"],
                    'pressure': sensor_json["bmp280"]["pressure"]
                },
                'DHT11': {
                    'temperature': sensor_json["dht11"]["temperature"],
                    'humidity': sensor_json["dht11"]["humidity"]
                },
                'DS18B20': {
                    'temperature': sensor_json["ds18b20"]
                },
                'Openweather': {
                    'temperature': "{:.2f}".format(outer_weather_data["main"]["temp"] - 273.15),
                    'humidity': outer_weather_data["main"]["humidity"],
                    'pressure': outer_weather_data["main"]["pressure"]
                }
            }

            backend_request = requests.post(backend_url, json=params_with_openweather)
            backend_request.raise_for_status()
        except requests.exceptions.HTTPError:
            print("Failed to perform the HTTP request to the backend!")
            raise
        except requests.exceptions.RequestException:
            print("Something went wrong during backend request...")
            raise
        else:
            print("Completed post at", datetime.datetime.now())


# Function to retrieve serial data
def retrieveSerialData(serial):
    try:
        serial_output = ser.readline()
    except (serial.SerialException, TypeError):
        raise
    else:
        serial_output_decoded = serial_output.decode("utf-8")
        return json.loads(serial_output_decoded)


# Continuous loop to check the serial port for data.
while True:
    try:
        jsonData = retrieveSerialData(ser)
    except serial.SerialException as e:
        print("Failed to read serial with error: ", e)  # In case of serial reading failure
    except TypeError as e:
        print("Failed to find USB with error: ", e)  # In case of no USB found
    else:
        try:
            request = requests.get(openweather_url, params=openweather_request_params)
            request.raise_for_status()
        except requests.exceptions.HTTPError as e:  # In case of a HTTP error code
            print("Failed to perform the Openweathermap HTTP request with error: ", e)
            try:
                postSensorData(jsonData, None)
            except requests.exceptions.HTTPError as e:
                print(e)
            except requests.exceptions.RequestException as e:
                print(e)
        except requests.exceptions.RequestException as e:  # In case of a request error
            print("Something went wrong... ", e)
            try:
                postSensorData(jsonData, None)
            except requests.exceptions.HTTPError as e:
                print(e)
            except requests.exceptions.RequestException as e:
                print(e)
        else:
            requestData = request.json()
            try:
                postSensorData(jsonData, requestData)
            except requests.exceptions.HTTPError as e:
                print(e)
            except requests.exceptions.RequestException as e:
                print(e)

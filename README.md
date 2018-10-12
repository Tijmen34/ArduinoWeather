# ArduinoWeather

## WeatherStation for the Arduino and Raspberry Pi

This project has been created for school purposes. The project consists
of two hardware pieces being connected and three sensors:
* Raspberry Pi (3 in my case)
* Arduino (Uno in my case)
	* DHT11
	* GY-BME280
	* DS18B20

The project itself contains four maps:
* Arduino, contains code you can deploy onto the Arduino. Install the
dependencies first:
	* Adafruit DHT
* Python, contains the code to be executed on the Raspberry Pi when the
Arduino connects. This will catch data from the serial. as well as data from a request call. Following libraries should be installed with pip:
	* PySerial
	* mysql-connector-Python
	* requests
* Service, contains the backend for the application. This will consist of a RESTful API with NodeJS, Typescript and NPM.
* Front-end consists of the HTML/CSS/JS. This will probably be made with Chart.js.

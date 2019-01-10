## ArduinowWeather Arduino Code
This code was created to be ran on an Arduino with three sensors connected to it. It will send a JSON object containing data from all three sensors over the serial port, which can be read out by the Python script for example. The following three sensors were used:
* DHT11
* GY-BME280
* DS18B20

This code should be ran with the Arduino IDE. The code needs a couple of libraries to work
* OneWire
* DallasTemperature
* Adafruit BMP280
* Adafruit DHT

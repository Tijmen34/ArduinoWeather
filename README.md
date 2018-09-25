# ArduinoWeather

##WeatherStation for the Arduino and Raspberry Pi

This project has been created for school purposes. The project consists 
of two hardware pieces being connected:
* Raspberry Pi (3 in my case)
* Arduino (Uno in my case)

The project itself contains three maps:
* Arduino, contains code you can deploy onto the Arduino. Install the 
dependencies first: 
	* Adafruit DHT
* Python, contains the code to be executed on the Raspberry Pi when the 
Arduino connects. This will catch the data that is being sent.
* Service, contains the service of the entire project and can be ran on 
the Raspberry Pi 3. It will be consisting of a front-end (HTML/CSS/JS) 
and a back-end 
service (Java)

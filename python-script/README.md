## ArduinoWeather Python Script
This script was created to receive the data from the Arduino over USB, do a request to the OpenWeatherMap API server for data and send this data to an API.  
  
Python and pip must both be installed on the system to be able to run this script.
  
## Project setup
Before installing anything, make sure that you filled in the config.json with your preferred information.  
Also check if the USB port that your Arduino is connected on with your Raspberry Pi corresponds with the one in the script.

After that, install all the dependencies with pip.
```
pip install pyserial requests
```

Then simply run the script with the following command.
```
python DataToAPI.py
```

#### Docker 
You can also deploy it with Docker!
```
docker build -t {PREFFERED_TAG_NAME} . 
```

Run the built image.
```
docker run -d --network=host --device=/dev/ttyUSB0 --name={DOCKER_CONTAINER_NAME} {IMAGE_NAME}
```

Beware, the device in this script might have to be changed. ttyUSB0 was the port that my Raspberry Pi used.

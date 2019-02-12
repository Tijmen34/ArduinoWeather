## ArduinoWeather Frontend
This folder contains the frontend for the ArduinoWeather project.

The frontend makes use of Node.js and NPM as package manager, using Vue as the application framework.
The application makes use of a backend hosted at http://rienstor.no-ip.org:3000/. If this service is not reachable, please run the backend locally on your machine and point the URLs to your localhost.

## Project setup
Node.js and NPM have to be installed on the machine.  
  
First install all the dependencies and http-server for production with NPM
```
npm install && npm install http-server
```

Run the frontend locally with hot-reload on port 8080
```
npm run serve
```

Run the frontend for production
```
npm run prod
```

### Docker
Dockerize this!
```
docker build -t {PREFERRED_TAG_NAME} .
```

Run the image
```
docker run -d -p 8080:8080 --name={DOCKER_CONTAINER_NAME} {IMAGE_NAME}
```

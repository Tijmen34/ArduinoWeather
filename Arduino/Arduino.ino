/*************************/
#include <OneWire.h> //Include OneWire lib
#include <DallasTemperature.h> //Include Dallas lib
#define DS18B20PIN 6 // Define the pin output for the DS18B20

OneWire oneWire(DS18B20PIN);
DallasTemperature sensors(&oneWire);
/*************************/
#include <Wire.h>
#include <SPI.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>

#define BMP_SCK 13
#define BMP_MISO 12
#define BMP_MOSI 11 
#define BMP_CS 10

//Adafruit_BMP280 bme;
Adafruit_BMP280 bme(BMP_CS); //Using SPI right here
/*************************/
#include "DHT.h" //Include DHT lib
#define DHTPIN 7 //Define the pin output for the DHT
#define DHTTYPE DHT11 //Defines the DHT you use

//Pin 1 - 5v, pin 2 - DHTPIN, pin 4 - GND
//A 10k resistor has to be put between pin 1 and pin 2

DHT dht(DHTPIN, DHTTYPE);
/*************************/

#include <ArduinoJson.h>

void setup() {
  Serial.begin(9600);
  Serial.println("Start!");

  initializeSensors();
}

void loop() {
  int DHTHumidity = DHTReadHumidity();
  int DHTTemperature = DHTReadTemp();
  
  double DS18B20Temperature = DS18B20ReadTemp();
  
  double BMP280Temperature = bme.readTemperature();
  float BMP280Pressure = bme.readPressure();
  double BMP280Altitude = bme.readAltitude(1030.00);

  StaticJsonBuffer<200> jsonBuffer;

  JsonObject& tempData = jsonBuffer.createObject();

  tempData["ds18b20"] = DS18B20Temperature;

  JsonObject& dht11 = tempData.createNestedObject("dht11");
  dht11["temperature"] = DHTTemperature;
  dht11["humidity"] = DHTHumidity;

  JsonObject& bmp280 = tempData.createNestedObject("bmp280");
  bmp280["temperature"] = BMP280Temperature;
  bmp280["pressure"] = BMP280Pressure;
  bmp280["altitude"] = BMP280Altitude;

  tempData.printTo(Serial);
  Serial.println();
  
  delay(5000);
}



void initializeSensors() {
  if(!bme.begin()){
    Serial.println("Could not find BMP280 sensor!");
  } else {
  dht.begin();
  bme.begin();
  }
}

int DHTReadTemp() {
  int temperature = dht.readTemperature();
  if(isnan(temperature)) {
    Serial.println("Failed to read DHT!");
  } else {
    return temperature;
  }
}

int DHTReadHumidity() {
    int humidity = dht.readHumidity();
    if(isnan(humidity)) {
      Serial.println("Failed to read DHT!");
    } else {
      return humidity;
    }
}

double DS18B20ReadTemp() {
  sensors.requestTemperatures();
  return sensors.getTempCByIndex(0);
}

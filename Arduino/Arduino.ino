/*************************/
#include <OneWire.h> //Include OneWire lib
#include <DallasTemperature.h> //Include Dallas lib
#define DS18B20PIN 6 // Define the pin output for the DS18B20

OneWire oneWire(DS18B20PIN);
DallasTemperature sensors(&oneWire);
/*************************/

/*************************/
#include "DHT.h" //Include DHT lib
#define DHTPIN 7 //Define the pin output for the DHT
#define DHTTYPE DHT11 //Defines the DHT you use
//Pin 1 - 5v, pin 2 - DHTPIN, pin 4 - GND
//A 10k resistor has to be put between pin 1 and pin 2

DHT dht(DHTPIN, DHTTYPE);
/*************************/

void setup() {
  Serial.begin(9600);
  Serial.println("Start!");
  
  initializeDHT();
}

void loop() {
  int DHTHumidity = DHTReadHumidity();
  int DHTTemperature = DHTReadTemp();
  double DS18B20Temperature = DS18B20ReadTemp();

  String humidity1 = "Humidity: ";
  String humidity2 = " %\t";
  String humidityString = humidity1 + DHTHumidity + humidity2;

  String temperature1 = "DHT Temperature: ";
  String temperature2 = " *C\n";
  String temperatureString = temperature1 + DHTTemperature + temperature2;

  String temperature3 = "DS18B20 Temperature: ";
  String temperatureString2 = temperature3 + DS18B20Temperature + temperature2;
  
  Serial.print(humidityString);
  Serial.print(temperatureString);
  Serial.print(temperatureString2);
  delay(2000);
}



void initializeDHT() {
  dht.begin();
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

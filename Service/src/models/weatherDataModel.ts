export interface DHT11Model {
  id: number,
  temperature: number,
  humidity: number,
  timestamp: string
}

export interface DS18B20Model {
  id: number,
  temperature: number,
  timestamp: string
}

export interface BMP280Model {
  id: number,
  temperature: number,
  pressure: number,
  altitude: number,
  timestamp: string
}

export interface OpenWeatherModel {
  id: number,
  temperature: number,
  pressure: number,
  humidity: number,
  timestamp: string
}

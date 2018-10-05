import serial
import json

serialOutput = serial.Serial('/dev/ttyUSB0', 9600)

while True:
    jsonData = json.load(serialOutput.readline())
    print(jsonData)

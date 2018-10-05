import serial
import json

ser = serial.Serial('/dev/ttyUSB0', 9600)

while True:
    serialOutput = ser.readline()
    jsonData = json.load(serialOutput)
    print(jsonData)

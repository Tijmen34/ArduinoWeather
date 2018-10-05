import serial
import json

ser = serial.Serial('/dev/ttyUSB0', 9600)

while True:
    serialOutput = [' ']
    while serialOutput[-1] != '}':
        serialOutput.append(ser.read(1))
    data = ''.join(serialOutput)
    jsonData = json.load(data)
    print(jsonData)

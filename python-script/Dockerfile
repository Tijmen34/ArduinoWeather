FROM python:3-slim

ADD ArduinoToMySQL.py /

RUN pip install pyserial requests

CMD ["python", "-u", "./ArduinoToMySQL.py"]

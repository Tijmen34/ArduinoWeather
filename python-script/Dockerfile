FROM python:3-slim

ADD ArduinoToMySQL.py /

RUN pip install pyserial mysql-connector-python requests

CMD ["python", "-u", "./ArduinoToMySQL.py"]

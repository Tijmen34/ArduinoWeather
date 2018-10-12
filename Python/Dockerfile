FROM python:3

ADD ArduinoToMySQL.py /

RUN pip install pyserial mysql-connector-python requests

CMD ["python", "./ArduinoToMySQL.py"]
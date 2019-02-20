FROM python:3-slim

ADD DataToAPI.py /

RUN pip install pyserial requests

CMD ["python", "-u", "./ArduinoToMySQL.py"]

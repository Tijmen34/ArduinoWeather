FROM python:3-slim

ADD DataToAPI.py config.json /

RUN pip install pyserial requests

CMD ["python", "-u", "./DataToAPI.py"]

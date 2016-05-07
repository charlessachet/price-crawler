FROM python:2.7.11

RUN pip install pymongo
RUN pip install requests

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

CMD ["python", "spider.py"]

FROM ubuntu:18.04


RUN apt-get update && apt-get install -y python3-pip && apt install libjpeg8-dev zlib1g-dev libtiff-dev libfreetype6 libfreetype6-dev libwebp-dev libopenjp2-7-dev libopenjp2-7-dev -y && pip3 install pillow --global-option="build_ext" --global-option="--enable-zlib" --global-option="--enable-jpeg" --global-option="--enable-tiff" --global-option="--enable-freetype" --global-option="--enable-webp" --global-option="--enable-webpmux" --global-option="--enable-jpeg2000" && apt-get clean

RUN apt-get update \
    && apt-get -y install libpq-dev gcc \
    && pip3 install psycopg2

WORKDIR /djangoproject

ADD . /djangoproject

RUN pip3 install -r requirements.txt

ENV PYTHONUNBUFFERED = 1

EXPOSE 80

CMD ["gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:80"]
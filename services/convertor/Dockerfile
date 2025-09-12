# pull official base image
FROM python:3.13.7-slim

# set work directory
WORKDIR /code/app

# set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# install dependencies
RUN apt update -y && apt install -y \
    libxrender1 \
    libglu1-mesa \
    libxcursor1 \
    libxft2 \
    libxinerama1 \
    libgomp1 \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

RUN mkdir -p uploads
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY ./app .
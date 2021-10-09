FROM node:14.17.1-stretch-slim
RUN addgroup waldo && adduser -S -G waldo waldo
USER waldo 
WORKDIR /app
COPY  . .

EXPOSE 3000
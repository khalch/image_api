FROM node:latest
RUN npm install nodemon -g
RUN mkdir -p /home/project/image_api
WORKDIR /home/project/image_api
COPY package.json /home/image_api
RUN npm install
COPY . /home/project/image_api
EXPOSE 3000
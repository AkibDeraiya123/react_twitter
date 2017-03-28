FROM node:6-alpine

RUN mkdir -p /twitter-clone-2

ADD ./package.json /twitter-clone-2/package.json

WORKDIR /twitter-clone-2/
RUN npm install --production -q

ADD ./ /twitter-clone-2

#Comando que inicia
CMD [ "npm", "start" ]

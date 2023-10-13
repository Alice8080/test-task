FROM node:18-alpine
WORKDIR /test/
COPY public/ /test/public
COPY src/ /test/src
COPY package.json /test/
RUN npm install
CMD ["npm", "start"]
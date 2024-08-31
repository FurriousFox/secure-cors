FROM node:20-alpine
COPY demoproxy.js /demoproxy.js
COPY package.json /package.json
RUN npm install
EXPOSE 11711
CMD ["node", "demoproxy.js", "-i"]
FROM node

WORKDIR /app/dlom-client-main-app 

COPY package.json .

RUN npm install 

COPY . .

EXPOSE 3000

CMD ["npm","start"]


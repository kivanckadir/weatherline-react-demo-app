FROM node:current-slim
WORKDIR /weatherline-react-demo-app
COPY package.json .
RUN yarn install
EXPOSE 3001
COPY . .
CMD PORT=3001 yarn start
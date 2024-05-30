# specific version of the node image as base
FROM node:18-alpine

# set the working directory in the container.
WORKDIR /app

COPY package*.json ./

RUN npm install

# check npm
RUN npm --version

COPY . .

EXPOSE 4200

# references docker-start command from package.json
CMD ["npm", "run", "docker-start"]
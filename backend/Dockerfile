# Grab the latest Node base image
FROM node:16.15-alpine as builder

# Set the current working directory inside the container
WORKDIR /app

COPY package.json package-lock.json tsconfig.json ./
RUN npm install

COPY . .

RUN npm run build:container

# Grab the latest Node base image
FROM node:16.15-alpine as runner

# Set the current working directory inside the container
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/config ./config

EXPOSE 3030

CMD ["npm", "start"]
FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

# Create log directory inside container
RUN mkdir -p /var/log/node-web-app && chown -R node:node /var/log/node-web-app

EXPOSE 3000

# Use non-root user
USER node

CMD ["node", "app.js"]


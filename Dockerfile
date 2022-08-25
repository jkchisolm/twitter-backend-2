FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy over package.json
COPY package*.json ./

# Copy over rest of source code
COPY . .

RUN cat swagger.json

RUN chmod +x ./wait-for-it.sh

# Install dependencies
RUN npm install

# Expose port 4000
EXPOSE 4000

# Expose port 8080
EXPOSE 8080

# Build server
RUN npm run build

# Start the server
CMD [ "npm", "start" ]
FROM node:18-slim

RUN apt-get update
RUN apt-get install -y openssl
# RUN apt-get install -y postgresql-client

# Create app directory
WORKDIR /usr/src/app

# Copy over package.json
COPY package*.json ./

# Copy over rest of source code
COPY . .

RUN chmod +x ./wait-for-it.sh

# Install dependencies
RUN npm install

# Expose port 4000
EXPOSE 4000

# Expose port 8080
EXPOSE 8080

# Generate prisma client
RUN npx prisma generate

# Build server
RUN npm run build

# Start the server
CMD [ "npm", "start" ]
FROM node:18-slim

RUN apt-get update
RUN apt-get install -y openssl
RUN apt-get install -y postgresql-client

# Create app directory
WORKDIR /usr/src/app

# Copy over package.json
COPY package*.json ./

# Copy over rest of source code
COPY . .

# Install dependencies
RUN npm install

# Expose port 4000
EXPOSE 4000

# Expose port 8080
EXPOSE 8080

# # wait for postgres
# RUN chmod +x ./wait-for-postgres.sh
# RUN ./wait-for-postgres.sh postgres postgres

# Generate prisma client
RUN npx prisma generate

# # Push schema to db
# RUN npx prisma db push --preview-feature

# Build server
RUN npm run build

# Start the server
CMD [ "npm", "start" ]
![twitter-backend-2](https://socialify.git.ci/frozenal/twitter-backend-2/image?description=1&descriptionEditable=Backend%20code%20of%20the%20clone%20of%20the%20famous%20social%20media%20app.&font=Raleway&language=1&name=1&owner=1&pattern=Charlie%20Brown&theme=Dark)

[![Version](https://img.shields.io/static/v1?label=version&message=0.1.0&color=orange)](https://shields.io/)
[![Node](https://img.shields.io/static/v1?label=node&message=18&color=success)](https://shields.io/)
[![PostgreSQL](https://img.shields.io/static/v1?label=postgresql&message=14.5&color=blue)](https://shields.io/)

### 🌐 Website - still in progress

## API Hosted On

- [https://twitter-api.server.joshuachisolmserver.com](https://twitter-api.server.joshuachisolmserver.com) **[Primary]**

This project is the backend for the clone of the famous social media application, constructed using the PERN stack.

This repo consists of the code for the backend of the project, to view the frontend, check out [Twitter-frontend](https://www.github.com/frozenal/twitter-frontend)

## Tech Stack

---

### Frontend

- Front-end framework: `React.js with Next.js`
- Styling: `SASS Modules`
- State management: `Redux`
- Fetching & caching: `React-Query`

### Backend

- API Server: `Node.js with Express.js`
- Database: `PostgreSQL with TypeORM`
- Web server: `Caprover running on a Hetzner Cloud server`

## **Setup**

---

There are two ways to set up the project

### Docker Compose setup (Recommended)

1. Open your CLI and create the directory
   ```
      mkdir twitter-clone
      cd twitter-clone
   ```
2. Clone the project

   ```
       git clone https://github.com/frozenal/twitter-backend-2.git
   ```

3. Build the image of the API and run Docker Compose
   ```
      docker build -t <YOUR_API_IMAGE_NAME> .
      docker-compose up
   ```
4. Use the APi client of your choice to send requests at http://localhost:4000

### Manual Setup

1. Open your CLI and create the directory
   ```
      mkdir twitter-clone
      cd twitter-clone
   ```
2. Clone the project

   ```
       git clone https://github.com/frozenal/twitter-backend-2.git
   ```

3. Set up the backend code
   - Create a `.env` file following the format in `.env.example`
   - Install the required modules with `npm install`
   - Install PostgreSQL if you do not already have it. If you do, ensure it is running
   - Run the server with `npm run build` then `npm run start`

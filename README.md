# Library Management System

A lightweight Library Management System built with Next.js 14, TypeScript, and MongoDB.

## Features

- View all books in the library
- Search and filter books
- Add new books to the collection
- View detailed information about each book
- Toggle book availability status

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB
- **Containerization**: Docker, docker-compose

## Getting Started

### Prerequisites

- Node.js 16+
- Docker and docker-compose

### Running with Docker

1. Clone the repository
2. Run the application with docker-compose:

```bash
docker-compose up -d
```

The application will be available at http://localhost:3000

### Running Locally (Development)

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file with your MongoDB connection:

```
MONGODB_URI=mongodb://localhost:27017/library
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. Start MongoDB (either locally or using Docker):

```bash
docker run -d -p 27017:27017 --name mongodb mongo:latest
```

5. Start the development server:

```bash
npm run dev
```

6. (Optional) Seed the database with sample data:

```bash
node scripts/seed-db.js
```

## Deployment on AWS EC2

1. Set up an EC2 instance with Docker and docker-compose installed
2. Clone the repository onto the EC2 instance
3. Run the application with docker-compose:

```bash
docker-compose up -d
```

4. Configure security groups to allow traffic on port 3000

## Project Structure

- `/app`: Next.js app directory with pages and API routes
- `/components`: React components
- `/lib`: Utility functions, MongoDB connection, and models
- `/public`: Static assets
- `docker-compose.yml`: Docker Compose configuration
- `Dockerfile`: Docker configuration
# Shift Management System - Frontend

This project is the frontend for the Shift Management System, built with Next.js. It provides an interface for users to manage shifts, users, and helpers, as well as view reports and export data.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Environment Variables](#environment-variables)
- [Docker Setup](#docker-setup)
- [License](#license)

## Getting Started

These instructions will help you set up the project on your local machine for development and testing purposes.

### Prerequisites
- [Docker](https://www.docker.com/) (for containerized development, also make sure to include docker-compose)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/shift-management-fe.git
   cd shift-management-fe
   ```

### Running the Application

#### Running in Development Mode

To run the project in development mode, use:

```bash
docker compose up
```

This will start the Next.js development server on [http://localhost:8000](http://localhost:8000).

#### Building for Production

To build the project for production, use:

```bash
npm run build
```

After building, you can start the production server with:

```bash
npm start
```

### Folder Structure

The project structure follows best practices for a Next.js application:

```
shift-management-fe/
├── src/
│   ├── components/          # Reusable components
│   ├── lib/                 # Library files (e.g., database connection)
│   ├── pages/               # Next.js pages (routes)
│   │   ├── api/             # API routes
│   │   │   ├── helpers/     # Helper-related API routes
│   │   │   ├── shifts/      # Shift-related API routes
│   │   │   └── auth/        # Authentication API routes
│   ├── styles/              # Global styles
├── public/                  # Public assets (e.g., images, icons)
├── docker/                  # Docker-related files
│   ├── Dockerfile           # Dockerfile for building the application
│   └── entrypoint.sh        # Entrypoint script for Docker
├── .gitignore               # Git ignore file
├── .gitattributes           # Git attributes file
├── next.config.js           # Next.js configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Project metadata and scripts
```

### Environment Variables

To run this project, you will need to add the following environment variables to your `.env.local` file:

```plaintext
MONGODB_URI=<your-mongodb-uri>
MONGODB_DB=<your-mongodb-database-name>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-nextauth-secret>
```

### Docker Setup

This project is configured to run in a Docker container.

#### Building the Docker Image

To build the Docker image, run:

```bash
docker compose build
```

#### Running the Docker Container

To run the container:

```bash
docker compose up
```

This will start the application in a Docker container and map port 8000 from the container to your local machine.

#### PODSLEEP Mode

The Docker setup includes a `PODSLEEP` environment variable. If `PODSLEEP` is set to `true`, the container will sleep indefinitely instead of starting the application. This can be useful for debugging purposes.

### License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
```

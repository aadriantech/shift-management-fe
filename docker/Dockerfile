# docker/Dockerfile

# Stage 1: Build Stage
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and lock files
COPY package.json yarn.lock* package-lock.json* ./

# Install dependencies based on the environment
ARG NODE_ENV
# RUN if [ "$NODE_ENV" = "development" ]; then \
#       npm install; \
#     else \
#       npm ci --only=production; \
#     fi

# Copy the rest of the application code
COPY . .

# Build the Next.js app
# RUN npm run build

# Stage 2: Production Stage
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the build artifacts from the builder stage
COPY --from=builder /app ./

# Expose the port the app runs on
EXPOSE 8000

# Copy the entrypoint script
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Use the entrypoint script
ENTRYPOINT ["entrypoint.sh"]

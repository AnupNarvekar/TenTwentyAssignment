# backend/Dockerfile

FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy backend source code
COPY backend/ ./backend

# Expose the backend port
EXPOSE 5000

# Set environment variables file (optional, handled via docker-compose too)
ENV NODE_ENV=development

# Command to run the backend server
CMD ["npm", "run", "server"]

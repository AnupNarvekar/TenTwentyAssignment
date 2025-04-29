FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install frontend dependencies
RUN npm install

# Copy frontend source code
COPY src/ ./src
COPY index.html vite.config.ts tsconfig*.json postcss.config.js tailwind.config.js ./

# Expose the frontend port (Vite dev server default is 5173)
EXPOSE 5173

# Set environment variables file (optional)
ENV NODE_ENV=development

# Command to run the frontend dev server
CMD ["npm", "run", "dev", "--", "--host"]

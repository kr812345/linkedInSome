# Use Node.js 20 slim image
FROM node:20-slim

# Set working directory to /app
WORKDIR /app

# Copy EVERYTHING (respecting .dockerignore)
# .dockerignore already excludes 'app/', 'node_modules', etc.
COPY . .

# Install font rendering dependencies
RUN apt-get update && apt-get install -y \
    libfontconfig1 \
    && rm -rf /var/lib/apt/lists/*

# Move into the backend directory where server.js and package.json live
WORKDIR /app/backend

# Install dependencies
RUN npm install --production --legacy-peer-deps

# Create uploads folder
RUN mkdir -p uploads

# Set production environment
ENV NODE_ENV=production

# The file is definitely in /app/backend/server.js now
CMD ["node", "server.js"]
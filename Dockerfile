# Use a slim Node.js image for faster builds
FROM node:20-slim

# Set working directory to root first
WORKDIR /app

# Copy only the backend package.json to install dependencies first (caching)
COPY backend/package.json ./backend/

# Install backend dependencies using npm
RUN cd backend && npm install --production --legacy-peer-deps

# Now copy the rest of the backend files
COPY backend/ ./backend/

# Move into the backend directory for execution
WORKDIR /app/backend

# Ensure the uploads directory exists
RUN mkdir -p uploads

# Set environment variables
ENV NODE_ENV=production

# Start the backend server
CMD ["node", "server.js"]
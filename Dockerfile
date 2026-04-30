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

# Set environment variables
ENV NODE_ENV=production
ENV PORT=5000

# Expose backend port
EXPOSE 5000

# Start the backend server
CMD ["node", "api/index.js"]
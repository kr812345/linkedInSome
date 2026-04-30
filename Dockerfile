# Use a slim Node.js image
FROM node:20-slim

# Set working directory to /app
WORKDIR /app

# Copy the entire backend folder to /app/backend
COPY backend/ ./backend/

# Move into the backend directory
WORKDIR /app/backend

# Install dependencies inside the backend folder
# We use --legacy-peer-deps to handle the cloudinary version conflict
RUN npm install --production --legacy-peer-deps

# Create the uploads folder to avoid errors
RUN mkdir -p uploads

# Set production environment
ENV NODE_ENV=production

# Start the server using an absolute-like path reference
CMD ["node", "server.js"]
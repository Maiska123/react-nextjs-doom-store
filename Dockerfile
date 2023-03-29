# Use a Node.js runtime as the base image
FROM node:16-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

ENV NODE_TLS_REJECT_UNAUTHORIZED=0

# Build the application
RUN npm run build

# Expose port 3000, which is the default port used by Next.js
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

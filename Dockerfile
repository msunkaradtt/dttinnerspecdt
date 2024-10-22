# Use official Node.js image as the base image
FROM node:18-alpine AS build

# Set working directory inside the container
WORKDIR /app

# Copy the rest of the application files
COPY . .

# Install dependencies
RUN npm install

# Build the React app using Vite
RUN npm run build

# Use a lightweight image to serve the app
FROM node:18-alpine AS production

# Install a lightweight HTTP server (serve)
RUN npm install -g serve

# Set working directory for production
WORKDIR /app

# Copy the build output from the previous stage
COPY --from=build /app/dist ./dist

# Expose port 80 for serving the app
EXPOSE 5173

# Serve the built React app using 'serve'
CMD ["serve", "-s", "dist", "-l", "5173"]

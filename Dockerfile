# Use official Node.js LTS image
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Set environment variables (you'll provide them at runtime)
ENV NODE_ENV=production

# Expose the port your app runs on
EXPOSE 4001

# Start the application
CMD ["node", "index.js"]

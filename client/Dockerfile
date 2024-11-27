# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the rest of the frontend application code into the container
COPY . .

# Expose the port your React app will run on
EXPOSE 4000

# Start the React application
CMD ["npm", "start"]

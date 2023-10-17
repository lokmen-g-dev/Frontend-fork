FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./
COPY package.json ./
# Install project dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the React app (modify the command if necessary)
RUN npm run build

# Expose a port for the application (modify as needed)
EXPOSE 3000

# Define the command to start the application
CMD ["npm", "start"]

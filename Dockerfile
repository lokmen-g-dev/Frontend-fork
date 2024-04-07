FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container

COPY package.json ./
# Install project dependencies
RUN npm install

# Copy the entire application to the container
COPY . .

# Build the React app (modify the command if necessary)
RUN npm run build
# Define the command to start the application
CMD ["npm", "start"]
# step2 server with nginx
FROM nginx:1.23-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf *
COPY --from=build /app/build .
EXPOSE 80
ENTRYPOINT [ "nginx", "-g", "daemon off;" ]

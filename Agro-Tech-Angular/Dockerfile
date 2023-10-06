FROM node:16-alpine as node
 

# Set the working directory within the container
WORKDIR /app



# Copy package.json and package-lock.json to the working directory
COPY package*.json /app

# Install app dependencies

RUN npm cache clean --force

RUN npm install 

# Copy the rest of the application source code to the working directory of container /app
COPY . .
# Build the Angular app for production (use your build command)

# Install Angular CLI globally (use your specific version)
RUN npm install -g @angular/cli@14.2.11

#RUN npm run build --prod to generate dist contains deployable package
RUN npm run build --prod

# Expose the port the app will run on 
#EXPOSE 4200
# Define the command to run the Angular app (if needed)
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200"]

# In most cases, you won't need to run the Angular app inside the container.
# Instead, you'll build the app in the container and serve it using a web server.


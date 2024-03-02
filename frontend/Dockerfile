# Stage 1: Build the Angular app in a node.js environment
FROM node:18 as build

WORKDIR /app

COPY package*.json /app/

RUN npm install

COPY . /app

# Build the Angular app in production mode and store the artifacts in dist folder
RUN npm run build

# Stage 2: Serve the Angular app with Nginx
FROM nginx:alpine

# Copy the nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Remove the default nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static assets from builder stage
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]

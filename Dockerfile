# Use official Nginx image for static site serving
FROM nginx:alpine

# Remove default Nginx static assets
RUN rm -rf /usr/share/nginx/html/*

# Copy static site files (adjust if your build output is elsewhere)
COPY public/ /usr/share/nginx/html/
COPY index.html /usr/share/nginx/html/
COPY src/pages/*.html /usr/share/nginx/html/

# Optionally copy assets
COPY public/assets/ /usr/share/nginx/html/assets/

# Expose port 80
EXPOSE 80

# Nginx runs by default

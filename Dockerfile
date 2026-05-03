FROM nginx:alpine

# Copy all project files to nginx html directory
COPY . /usr/share/nginx/html/

# Expose port 80 (Cloud Run will route traffic here if configured)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

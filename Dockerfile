# 1. Build app with Node
FROM node:20 AS builder
# Working directory
WORKDIR /app
# Copy files
COPY . .
# Install all dependencies
RUN npm install
# Build
RUN npm run build

# 2. Run Nginx
FROM nginx:stable-alpine
# Copy nginx settings(not yet)
COPY nginx.conf /etc/nginx/conf.d/default.conf
# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html
# Exposing port
EXPOSE 80
# Run Nginx
CMD ["nginx", "-g", "daemon off;"]

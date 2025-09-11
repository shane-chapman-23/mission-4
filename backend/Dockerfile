# Use Node LTS 22
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install all dependencies including devDependencies
RUN npm install --include=dev

# Copy the rest of the source code
COPY . .

# Expose backend port
EXPOSE 5000

# Use nodemon for dev hot reload
CMD ["npm", "run", "dev"]
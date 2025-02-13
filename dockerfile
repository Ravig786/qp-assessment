# Use an official Node.js runtime as a parent image
FROM node:lts AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

COPY prisma ./prisma

# Generate Prisma Client
RUN npx prisma generate

# Copy the rest of the application files
COPY . .

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 5000

# Start the application
CMD ["npm", "run", "stage"]

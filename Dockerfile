# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install

# Copy all project files
COPY . .

# Copy the environment variables file
COPY .env.development .env

# Build the Next.js project
RUN yarn build

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["yarn", "start"]

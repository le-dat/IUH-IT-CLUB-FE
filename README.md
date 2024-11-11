# IUS TSE Club

This repository contains the source code for the IUS TSE Club project, which includes both client and server components.

## Project Structure

## Client

The client side is built with Next.js and TypeScript. It includes various components, hooks, and utilities to manage the user interface and interactions.

### Key Directories

- `components/`: Contains reusable UI components.
- `hooks/`: Custom hooks for state and effect management.
- `lib/`: Utility functions and helpers.
- `services/`: API service functions.
- `public/`: Static assets.
- `styles/`: Global styles and Tailwind CSS configuration.

### Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production.
- `npm run start`: Start the production server.

## Server

The server side is built with Express.js and MongoDB. It handles API requests, authentication, and database interactions.

### Key Directories

- `configs/`: Configuration files for the server.
- `controllers/`: Route handlers and business logic.
- `middleware/`: Express middleware functions.
- `models/`: Mongoose models for MongoDB.
- `routes/`: API route definitions.

### Scripts

- `npm start`: Start the server with Nodemon for development.

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/ius-tse-club.git
   cd ius-tse-club

   cd client
   npm install
   cd ../server
   npm install

   cd client
   npm run dev
   cd ../server
   npm start
   ```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.


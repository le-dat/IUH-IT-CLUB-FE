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

2. Create a new .env file
   ```sh
   NEXT_PUBLIC_APP_HOST=https://iuh-it-club.vercel.app
   NEXT_PUBLIC_API_ENDPOINT=http://localhost:5000/api
   NEXT_PUBLIC_OPENAI_API_KEY=
   ```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## 📝 Version

0.1.0

## Author

### Le Quoc Dat

Passionate software developer with a knack for creating efficient and user-friendly applications. Dedicated to continuous learning and improvement, always exploring new technologies and methodologies.

- **Portfolio:** [Website Portfolio](https://ledat-portfolio.vercel.app/)
- **GitHub:** [Le Quoc Dat](https://github.com/le-dat)
- **LinkedIn:** [Le Quoc Dat](https://www.linkedin.com/in/le-quoc-dat)

Feel free to reach out for collaboration or any inquiries!

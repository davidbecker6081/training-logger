import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';  // Import CORS
import bodyParser from 'body-parser';  // Import body-parser
import { User } from './models/User'; // Import the User model
import userRoutes from './routes/userRoutes'; // Import user routes
import createError, { HttpError } from 'http-errors';
import sequelize from './db';

const app = express();
const port = 4000;

// Enable CORS for all origins (can be customized later)
const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  origin: allowedOrigins
};
app.use(cors(options));  // Use CORS middleware

// Use body-parser for parsing JSON and URL-encoded data
app.use(bodyParser.json());  // For parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));  // For parsing application/x-www-form-urlencoded

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// Sync models with the database
sequelize.sync({ force: false }) // { force: true } will drop and recreate the tables on every restart (useful during development)
  .then(() => {
    console.log('Database synced');
  });

// Use routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript Express!');
});


app.use((err: HttpError, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
      error: {
          message: err.message || 'Internal Server Error',
      },
  });
});

app.use('/api', userRoutes); // Prefix API routes with /api

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

export default sequelize; // Export the sequelize instance
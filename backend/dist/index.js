"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const express_1 = __importDefault(require("express"));
// import cors from 'cors';  // Import CORS
const body_parser_1 = __importDefault(require("body-parser")); // Import body-parser
const sequelize_1 = require("sequelize");
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Import user routes
const app = (0, express_1.default)();
const port = 4000;
// Enable CORS for all origins (can be customized later)
// const allowedOrigins = ['http://localhost:3000'];
// const options: cors.CorsOptions = {
//   origin: allowedOrigins
// };
// app.use(cors(options));  // Use CORS middleware
// Use body-parser for parsing JSON and URL-encoded data
app.use(body_parser_1.default.json()); // For parsing application/json
app.use(body_parser_1.default.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
// Initialize Sequelize (PostgreSQL)
const sequelize = new sequelize_1.Sequelize('postgres://postgres:password@localhost:5432/training_logger'); // Update your credentials
exports.sequelize = sequelize;
// Test the database connection
sequelize.authenticate()
    .then(() => {
    console.log('Connection has been established successfully.');
})
    .catch((err) => {
    console.error('Unable to connect to the database:', err);
});
// Sync models with the database
sequelize.sync({ force: true }) // { force: true } will drop and recreate the tables on every restart (useful during development)
    .then(() => {
    console.log('Database synced');
});
// Use routes
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        error: {
            message: err.message || 'Internal Server Error',
        },
    });
});
app.use('/api', userRoutes_1.default); // Prefix API routes with /api
// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

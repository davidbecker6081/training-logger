"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const sequelize_1 = require("sequelize");
const index_1 = require("../index"); // Import sequelize instance from the main entry point
// Define the User model
class User extends sequelize_1.Model {
}
exports.User = User;
// Initialize the User model with the sequelize instance
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: index_1.sequelize, // Use the passed sequelize instance
    tableName: 'user',
});

import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

// Define types for User attributes
interface UserAttributes {
  id: number;
  name: string;
  email: string;
}

// Define the attributes for creation (no id for creation)
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

// Define the User model
export class User extends Model{
  public id!: number;
  public name!: string;
  public email!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
// Initialize the User model with the sequelize instance
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize, // Use the passed sequelize instance
    tableName: 'user',
  }
);

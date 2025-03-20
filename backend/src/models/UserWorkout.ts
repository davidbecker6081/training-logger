import { DataTypes, Model, CreationOptional, Sequelize } from 'sequelize';
import { Workout } from './Workout';
import { User } from './User';

export class UserWorkout extends Model {
    declare userId: number;
    declare workoutId: number;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initialize(sequelize: Sequelize) {
        UserWorkout.init(
            {
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                        model: User,
                        key: 'id'
                    }
                },
                workoutId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    primaryKey: true,
                    references: {
                        model: Workout,
                        key: 'id'
                    }
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                sequelize,
                paranoid: true,
                tableName: 'user_workouts',
                underscored: true,
                modelName: 'UserWorkout'
            }
        );
    }
}

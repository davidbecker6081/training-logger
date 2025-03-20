import { Sequelize, DataTypes, Model, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';

export class Workout extends Model<InferAttributes<Workout>, InferCreationAttributes<Workout>> {
    declare id: CreationOptional<number>;
    declare name: string;
    declare description: string;
    declare date: Date;
    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;

    static initialize(sequelize: Sequelize) {
        Workout.init(
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
                description: {
                    type: DataTypes.STRING,
                    allowNull: true,
                },
                date: {
                    type: DataTypes.DATE,
                    allowNull: false
                },
                createdAt: DataTypes.DATE,
                updatedAt: DataTypes.DATE
            },
            {
                sequelize,
                paranoid: true,
                tableName: 'workout',
                underscored: true
            }
        );
    }
}
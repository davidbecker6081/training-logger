import sequelize from '../db';
import { User } from './User';
import { Workout } from './Workout';
import { UserWorkout } from './UserWorkout';

// Initialization
User.initialize(sequelize);
Workout.initialize(sequelize);
UserWorkout.initialize(sequelize);

// Associations
User.belongsToMany(Workout, { through: UserWorkout });
Workout.belongsToMany(User, { through: UserWorkout });

// Exports
export { User, Workout, UserWorkout };
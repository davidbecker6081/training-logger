import userRoutes from './users';
import workoutRoutes from './workouts';
import router from '../router';

router.use('/users', userRoutes);
router.use('/workouts', workoutRoutes);

export default router;
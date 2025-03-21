import { Router, Request, Response, NextFunction } from 'express';
import { Workout } from '../models/index';
import { notFoundError } from '../services/error-service';
import router from '../router';
import routePaths from './paths';

router.get(routePaths.WORKOUTS, async (req: Request, res: Response) => {
  try {
    const workouts = await Workout.findAll();
    res.status(200).json(workouts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving workouts' });
  }
});

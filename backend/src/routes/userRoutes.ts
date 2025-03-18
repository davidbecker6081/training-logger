import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import createError, { HttpError } from 'http-errors';
const router = Router();

const notFoundError = createError(404, 'Resource not found');


router.delete(
  '/users/:id',
  async (req: Request, res: Response) => {
    const userId: any = req.params.id;
    try {
      const user = await User.findByPk(userId);
      if (!user) {
        // return next(notFoundError);
        res.status(404).json({ message: 'User not found' });
      }
      else {
        await user.destroy();
        res.status(204).end();
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  }
);


// POST route to create a user
router.post('/users', async (req: Request, res: Response) => {
  const { name, email } = req.body;
  try {
    const newUser = await User.create({ name, email });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating user' });
  }
});

// GET route to fetch all users
router.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving users' });
  }
});

// // GET route to fetch a user by id
// router.get('/users/:id', async (req: Request<{ id: string }, any, any>, res: Response) => { // Explicitly type `id` as a string in params
//   const { id } = req.params;
//   try {
//     const user = await User.findByPk(id);
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
//     res.status(200).json(user);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Error retrieving user' });
//   }
// });

// PUT route to update a user
router.put('/users/:id', async (req: Request, res: Response, next: NextFunction) => {

  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return next(createError(400, 'Invalid user ID'));
    }
    user.name = name;
    user.email = email;
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user' });
  }
});


export default router;

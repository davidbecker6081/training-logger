"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const http_errors_1 = __importDefault(require("http-errors"));
const router = (0, express_1.Router)();
const notFoundError = (0, http_errors_1.default)(404, 'Resource not found');
// router.delete(
//   '/users/:id',
//   async (req: Request, res: Response, next: NextFunction) => {
//     const { id } = req.params;
//     try {
//       const user = await User.findByPk(id);
//       if (!user) {
//         return next(notFoundError);
//         // return res.status(404).json({ message: 'User not found' });
//       }
//         await user.destroy();
//         return res.status(204).end();
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Error deleting user' });
//     }
//   }
// );
// POST route to create a user
router.post('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email } = req.body;
    try {
        const newUser = yield User_1.User.create({ name, email });
        res.status(201).json(newUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}));
// GET route to fetch all users
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.findAll();
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving users' });
    }
}));
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
router.put('/users/:id', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
        const user = yield User_1.User.findByPk(id);
        if (!user) {
            return next((0, http_errors_1.default)(400, 'Invalid user ID'));
        }
        user.name = name;
        user.email = email;
        yield user.save();
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating user' });
    }
}));
exports.default = router;

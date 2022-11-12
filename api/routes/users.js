import express from 'express';
import {
  createUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../utils/verifyToken.js';

const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//   res.send('Your are logedin');
// });

// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//   res.send('Your are logedin and you can delete your account');
// });

// router.get('/checkadmin', verifyAdmin, (req, res, next) => {
//   res.send('Admin are loggedin!');
// });

// UPDATE
router.put('/:id', verifyUser, updateUser);

// DELETE
router.delete('/:id', verifyUser, deleteUser);

// GET
router.get('/:id', verifyUser, getUser);

// GET ALL
router.get('/', verifyAdmin, getUsers);

export default router;

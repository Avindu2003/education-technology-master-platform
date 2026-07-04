import express from 'express';
import { check } from 'express-validator';
import { loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post(
  '/login',
  [
    check('email', 'Please include a valid email').isEmail().normalizeEmail(),
    check('password', 'Password is required').exists().notEmpty().trim().escape()
  ],
  loginUser
);

export default router;
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';

export const loginUser = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    const user = {
        id: '12345',
        email: 'student@example.com',
        role: 'student',
        passwordHash: await bcrypt.hash('password123', 10)
    };

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' }); // Generic message for security
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid email or password.' });
    }

    const payload = { id: user.id, role: user.role };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'fallback_secret', {
      expiresIn: '2h'
    });

    return res.status(200).json({
      success: true,
      token,
      user: { id: user.id, email: user.email, role: user.role }
    });

  } catch (error) {
    console.error('[Auth Error]:', error);
    return res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
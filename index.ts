import express from 'express';
import crypto from 'crypto';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(cors(corsOptions));



app.post('/signup', async (req, res, next) => {
  const salt = crypto.randomBytes(32);

  crypto.pbkdf2(req.body.password, salt, 310000, 64, 'sha512', async (err, hashedPassword) => {
    if (err) { return next(err); }
    
    try {
      const user = await prisma.user.create({
        data: {
          username: req.body.username,
          email: req.body.email,
          hashed_password: hashedPassword,
          salt: salt,
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          avatar: req.body.avatar,
        },
        select: {
          username: true, first_name: true, last_name: true, id: true, email: true,
        }
      });
      res.status(200).json({ message: user || 'User is null' });
    } catch (error) {
      res.status(500).json({ error: error});
    }
  })
});

app.listen(4000);
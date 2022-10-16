import express from 'express';
import cors from 'cors';

const app = express();

app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true
};

app.use(cors(corsOptions));

app.get('/', async (req, res) => {
  try {
    res.status(200).json({ message: "hello world" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(4000);
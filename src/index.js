import * as dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

const app = express();

import jewelsRouter from './routes/jewels.routes.js';

app.use(express.json());
app.use(cors());
app.use('/api', jewelsRouter);

app.get('/', (req, res) => {
  res.json({ ok: true, msg: 'Hola mundo!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));

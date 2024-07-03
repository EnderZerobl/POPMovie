import { PrismaClient } from '@prisma/client';
import express from 'express';
import { Request, Response } from 'express';
import router from './routes/rotas';

const app = express();
const cors = require('cors');
const prisma = new PrismaClient();

app.use(express.json());

app.use(cors());

app.use('/',router);

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Servidor ${PORT}`);
});

export{prisma}
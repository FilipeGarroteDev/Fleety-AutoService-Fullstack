import express from 'express';

import cors from 'cors';
import { loadEnvs } from '@/config';

loadEnvs();

const server = express();
server.use(express.json());
server.use(cors());

server.get('/health', (req, res) => res.send('tudo certo, nego!'));

server.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));

import express from 'express';
import './model/database/config';
import { mainRouter } from './routers';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use(mainRouter());
app.use(errorHandler);

export default app;
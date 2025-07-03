import express from 'express';
import './model/database/config';
import router from './routers';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;
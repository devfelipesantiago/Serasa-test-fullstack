import express from 'express';
import './model/database/config';
import router from './routers';

const app = express();
app.use(express.json());
app.use(router);

export default app;
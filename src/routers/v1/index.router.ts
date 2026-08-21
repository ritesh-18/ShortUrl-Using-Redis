import express from 'express';
import pingRouter from './ping.router';
import { urlShortnerRoutes } from './urlshortner.router';

const v1Router = express.Router();



v1Router.use('/ping',  pingRouter);
v1Router.use("/url" ,urlShortnerRoutes)
export default v1Router;
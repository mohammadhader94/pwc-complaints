
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import complaintsRoutes from './routes/complaintsRouter.js';
import userRouter from "./routes/user.js";

dotenv.config();
const app = express();

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use('/complaints', complaintsRoutes);
app.use("/user", userRouter);

const CONNECTION_URL = process.env.ATLAS_URI;
const PORT = process.env.PORT|| 5000;


mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose'

dotenv.config();

const app: Express = express();
const port = process.env.PORT;
const MONGO_URL: string = process.env.MONGO_URL || '';

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

try {
	mongoose.connect(MONGO_URL, {})
	console.log('MongoDB connected')
} catch (err) {
	console.log('MongoDB connection error', err)
}

mongoose.connection.on('error', err => {
  console.log('MongoDB connection error: ' + err);
});


app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
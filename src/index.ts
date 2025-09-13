import express, {Express} from "express";
import mongoose from "mongoose";
import financialRecordRouter from "./routes/financial-record";
import cors from "cors";
import dotenv from 'dotenv';

dotenv.config();


const app: Express = express();
const port = process.env.PORT || 3001;
const mongoUri = process.env.MONGO_URI;

app.use(express.json());
app.use(cors());


if (!mongoUri) {
  console.error('ERROR: MONGO_URI is not defined in the .env file or environment variables.');
  process.exit(1); 
}


mongoose.connect(mongoUri)
  .then(() => {
    console.log('MongoDB connected successfully.');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });

app.use("/financial-records", financialRecordRouter);

app.listen(port, ()=>{
    console.log(`Server Running on port ${port}`);
})
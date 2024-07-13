import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config({ path: "./config/.env" });
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';

if (process.env.NODE_ENV !== "production") {
    const { default: connectDB } = await import('./config/database.js');
    connectDB();
}
app.use(cors());    
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.get("/", (req, res) => {
    res.send("Home Page");
});
app.use("/user", userRoutes);


app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
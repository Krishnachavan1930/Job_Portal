import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
    credentials: true
};

app.use(cors(corsOptions));

// API routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/company", companyRoute);
app.use("/api/v1/job", jobRoute);
app.use("/api/v1/application", applicationRoute);

// Basic route for testing
app.get('/', (req, res) => {
    res.send('Welcome to the Naukri Search API');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

const PORT = process.env.PORT || 3000;

// Connect to MongoDB and start the server
const startServer = async () => {
    try {
        await connectDB();
        app.listen(PORT, () => {
            console.log(`Server running at port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to connect to the database. Server not started.', error);
        process.exit(1);
    }
};

startServer();

export default app;
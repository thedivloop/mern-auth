import path from "path";
import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import cookieParser from "cookie-parser";
const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/users", userRoutes);

if (process.env.NODE_ENV === "production") {
	const __dirname = path.resolve();
	app.use(express.static(path.join(__dirname, "frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
} else {
	app.get("/", (req, res) => res.send("server is ready"));
}

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));

// TODO POST /api/users - Register a user
// TODO POST /api/users/auth - Authenticate a user and get token
// TODO POST /api/users/logout - Logout user and clear cookie
// TODO GET /api/users/profile - Get user profile
// TODO PUT /api/users/profile - Update profile

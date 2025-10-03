import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js";

const app = express(); // Initialize app first

// Middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "*", // allow frontend origin
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Use userRouter for /api/v1/users routes
app.use("/api/v1/users", userRouter);

// Example test route
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// Optional: direct route for registration (if not handled in userRouter)
app.post("/api/v1/users/register", (req, res) => {
  res.status(201).json({ message: "User registered successfully!" });
});

export default app;

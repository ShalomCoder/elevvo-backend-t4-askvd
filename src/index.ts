import express from "express";
import helmet from "helmet";
import { getJwtSecret } from "./config/auth.js";
import corsMiddleware from "./middleware/cors.js";
import logRequest from "./middleware/logRequest.js";
import authRoutes from "./routes/auth.js";
import "dotenv/config.js";

const app = express();

app.use(helmet());
app.use(corsMiddleware);
app.use(express.json());
app.use(logRequest);

app.use(authRoutes);

getJwtSecret();

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
import express from "express";
import helmet from "helmet";
import logRequest from "./middleware/logRequest.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(helmet());
app.use(express.json());
app.use(logRequest);

app.use(authRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
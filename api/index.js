import express from "express";
import cors from "cors";
import "dotenv/config";

import connectDB from "../server/configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "../server/inngest/index.js";
import showRouter from "../server/routes/showRoutes.js";

const app = express();

// Connect DB inside serverless
await connectDB();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send("Quickshow API is running on Vercel 🚀");
});

// Inngest sync route
app.use("/api/inngest", serve({ client: inngest, functions }));

// Main show routes
app.use("/api/show", showRouter);

// Export for Vercel Serverless
export default app;

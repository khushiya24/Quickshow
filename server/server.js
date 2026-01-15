// import express from 'express';
// import cors from 'cors';
// import dotenv from "dotenv";
// dotenv.config();
// import connectDB from './configs/db.js';
// import { clerkMiddleware } from '@clerk/express'
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";


// const app = express();
// const port = 3000;

// await connectDB();

// app.use(express.json())
// app.use(cors());
// app.use(clerkMiddleware())


// app.get('/', (req, res) => {
//   res.send('Quickshow Server is running');
// });
// app.use('/api/inngest', serve({ client: inngest, functions }))

// app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`)) ;






// import express from "express";
// import cors from "cors";
// import "dotenv/config";
// import connectDB from "./configs/db.js";
// import { clerkMiddleware } from "@clerk/express";
// import { serve } from "inngest/express";
// import { inngest, functions } from "./inngest/index.js";
// import showRouter from "./routes/showRoutes.js";
// import bookingRouter from "./routes/bookingRoutes.js";
// import adminRouter from "./routes/adminRoutes.js";
// import userRouter from "./routes/userRoutes.js";

// const app = express();
// const port = 3000;

// await connectDB();

// app.use(express.json());
// app.use(cors());
// app.use(clerkMiddleware());

// app.get("/", (req, res) => {
//   res.send("Quickshow Server is running on Vercel");
// });

// app.use("/api/inngest", serve({ client: inngest, functions }));

// app.use('/api/show', showRouter);

// app.use('/api/booking', bookingRouter);

// app.use('/api/admin', adminRouter);

// app.use('/api/user', userRouter);


// app.listen(port, () => console.log(`Server is listening at http://localhost:${port}`)) ;


// export default app;   // ⬅ Vercel needs this





import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/db.js";

// ✅ Correct Clerk imports
import { clerkMiddleware, requireAuth, clerkClient } from "@clerk/express";

import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";

import showRouter from "./routes/showRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";

import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

const app = express();
const port = 5000;

await connectDB();

// 🔵 Stripe Webhooks (must be before express.json)
app.use(
  "/api/stripe",
  express.raw({ type: "application/json" }),
  stripeWebhooks
);

// Normal JSON parser (after Stripe)
app.use(express.json());
app.use(cors());

// ✅ Correct Clerk middleware
app.use(clerkMiddleware());

// TEST ROUTE
app.get("/test", requireAuth(), async (req, res) => {
  try {
    const user = await clerkClient.users.getUser(req.auth.userId);

    res.json({
      userId: user.id,
      privateMetadata: user.privateMetadata,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/", (req, res) => {
  res.send("Quickshow Server is running on Vercel");
});

// Routes
app.use("/api/inngest", serve({ client: inngest, functions }));
app.use("/api/show", showRouter);
app.use("/api/bookings", bookingRouter);
app.use("/api/admin", adminRouter);
app.use("/api/user", userRouter);

app.listen(port, () =>
  console.log(`Server is listening at http://localhost:${port}`)
);

export default app;

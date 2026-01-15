// import express from "express";
// import { createBooking, getOccupiedSeats } from "../controllers/bookingController.js";

// const bookingRouter = express.Router();

// bookingRouter.post("/create", createBooking);
// bookingRouter.get("/seats/:showId", getOccupiedSeats);

// export default bookingRouter;




import express from "express";
import { createBooking, getOccupiedSeats,  createStripePayment } from "../controllers/bookingController.js";
import { requireAuth } from "@clerk/express";

const bookingRouter = express.Router();

bookingRouter.post("/create", requireAuth(), createBooking);
bookingRouter.get("/seats/:showId", getOccupiedSeats);
bookingRouter.get("/pay/:bookingId", requireAuth(), createStripePayment);


export default bookingRouter;



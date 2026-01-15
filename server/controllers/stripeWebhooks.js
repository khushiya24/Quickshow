import Stripe from "stripe";
import Booking from "../models/Booking.js";
import { inngest } from "../inngest/index.js";

const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeWebhooks = async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    // 1. Construct event
    try {
        event = stripeInstance.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error("Webhook signature verification failed:", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // 2. Handle events
    try {
        switch (event.type) {
            case "payment_intent.succeeded": {
                const paymentIntent = event.data.object;

                const sessionList = await stripeInstance.checkout.sessions.list({
                    payment_intent: paymentIntent.id,
                });

                const session = sessionList.data[0];
                const bookingId = session?.metadata?.bookingId;

                if (!bookingId) {
                    console.error("No bookingId found in session metadata");
                    break;
                }

                await Booking.findByIdAndUpdate(bookingId, {
                    isPaid: true,
                    paymentLink: ""
                });

                // send confirmsation email can be triggered here using inngest

                await inngest.send({
                    name: "app/showbooked",
                    data: { bookingId }
                })
                
                break;
            }

            default:
                console.log("Unhandled event type:", event.type);
        }

        res.json({ received: true });
    } catch (err) {
        console.error("Webhook processing error:", err);
        res.status(500).send("Internal Server Error");
    }
};























// import Stripe from "stripe";
// import Booking from "../models/Booking.js";

// const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2023-10-16",
// });

// export const stripeWebhooks = async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripeInstance.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error("Webhook signature verification failed:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   try {
//     switch (event.type) {

//       // 🔥 MOST RELIABLE EVENT FOR CHECKOUT PAYMENTS
//       case "checkout.session.completed": {
//         const session = event.data.object;

//         const bookingId = session.metadata?.bookingId;

//         if (!bookingId) {
//           console.error("No bookingId found in metadata");
//           break;
//         }

//         await Booking.findByIdAndUpdate(bookingId, {
//           isPaid: true,
//           paymentLink: "",
//         });

//         console.log("Booking marked as PAID:", bookingId);
//         break;
//       }

//       // 🔧 Optional, but can be kept for safety
//       case "payment_intent.succeeded": {
//         console.log("Payment intent succeeded, but booking handled via session.");
//         break;
//       }

//       default:
//         console.log("Unhandled event type:", event.type);
//     }

//     res.json({ received: true });
//   } catch (err) {
//     console.error("Webhook processing error:", err);
//     res.status(500).send("Internal Server Error");
//   }
// };


// functio  to check availabiltity of seats for a particular show

import Show from "../models/Show.js"
import { Booking } from "../models/Booking.js";
import Stripe from "stripe";


const checkSeatsAvailability = async (showId, selectedSeats) => {
    try {

        const showData = await Show.findById(showId)
        if(!showData) return false;

        const occupiedSeats = showData.occupiedSeats;

        const isAnySeatTaken = selectedSeats.some(seat => occupiedSeats[seat]);

        return !isAnySeatTaken;

    } catch (error) {
        console.error(error.message);
        return false;
    }
};
       

export const createBooking = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { showId, selectedSeats } = req.body;

        // FIX: frontend URL
        const origin = process.env.FRONTEND_URL || "http://localhost:5173";

        // check seat availability
        const isAvailable = await checkSeatsAvailability(showId, selectedSeats);

        if (!isAvailable) {
            return res.json({ success: false, message: "Selected seats are not available" });
        }

        const showData = await Show.findById(showId).populate("movie");

        const booking = await Booking.create({
            user: userId,
            show: showId,
            amount: selectedSeats.length * showData.showPrice,
            bookedSeats: selectedSeats,
        });

        selectedSeats.forEach(seat => {
            showData.occupiedSeats[seat] = userId;
        });

        showData.markModified("occupiedSeats");
        await showData.save();

        const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY);

        const lineItems = [
            {
                price_data: {
                    currency: "usd",
                    product_data: { name: showData.movie.title },
                    unit_amount: Math.floor(booking.amount) * 100,
                },
                quantity: 1,
            },
        ];

        const session = await stripeInstance.checkout.sessions.create({
            success_url: `${origin}/loading/my-bookings`,
            cancel_url: `${origin}/my-bookings`,
            line_items: lineItems,
            mode: "payment",
            metadata: { bookingId: booking._id.toString() },
            expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
        });

        booking.paymentLink = session.url;
        await booking.save();

        res.json({ success: true, url: session.url });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};


export const getOccupiedSeats = async (req, res) => {
    try{
        const { showId } = req.params;
        const showData = await Show.findById(showId);
if (!showData) {
    return res.json({ success: false, message: "Show not found" });
}

const occupiedSeats = Object.keys(showData.occupiedSeats || {});
res.json({ success: true, occupiedSeats });



    } catch (error) {
        console.log(error.message);
        res.json({success: false, message: error.message});
    }
};
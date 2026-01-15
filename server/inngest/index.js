import { Inngest } from "inngest";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import sendEmail from "../configs/nodeMailer.js";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// Inngest function to save user sign up data to database
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-from-creation'},
    {event: 'clerk/user.created'},

    async ({ event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            _id: id,
            name: first_name + " " + last_name,
            email: email_addresses[0].email_address,
            image: image_url,

        }
        await User.create(userData);
    }  
)

// Inngest function to delete user from database

const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clerk/user.deleted'},

    async ({ event}) => {
        const {id} = event.data;
        await User.findByIdAndDelete(id);

        
    }  
)
// Inngest function to update user from database

const syncUserUpdation = inngest.createFunction(
    {id: 'update-user-from-clerk'},
    {event: 'clerk/user.updated'},

    async ({ event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data;
        const userData = {
            name: first_name + " " + last_name,
            email: email_addresses[0].email_address,
            image: image_url
        }
        await User.findByIdAndUpdate(id, userData);
        
    }  
)


// inngest fun to cancel booking when payment fails can be added here 
const releaseSeatsAndDeleteBooking = inngest.createFunction(
    {id: 'release-seats-delete-booking'},
    {event: 'app/checkpayment'},
    async ({ event, step}) => {
        const tenMinutesLater = new Date(Date.now() + 10 * 60 * 1000);

        await step.sleepUntil('wait-for-10-minutes', tenMinutesLater);

        await step.run('check-payment-status', async () => {
            const bookingId  = event.data.bookingId;
            const booking = await Booking.findById(bookingId);


            // if payment is not made, release seats and delete booking
            if(!booking.isPaid){
                const show = await Show.findById(booking.show);
                booking.bookedSeats.forEach((seat) => {
                    delete show.occupiedSeats[seat];
                });
                show.markModified('occupiedSeats');
                await show.save();
                await Booking.findByIdAndDelete(booking._id);
            }
        });
    }
)

// inngest fun to send email  when user books a show
const sendBookingConfirmationEmail = inngest.createFunction({
    id: 'send-booking-confirmation-email'},
    {event: 'app/show.booked'},
    async ({ event, step}) => {
        const {bookingId} = event.data;

        const booking = await Booking.findById(bookingId).populate({
            path: 'show',
            populate: {path: 'movie', 
            model: 'Movie'}
        }).populate('user');

        await sendEmail({
            to: booking.user.email,
            subject: `Booking Confirmation - Quickshow: "${booking.show.movie.title}"`,
            body: `
            <h1>Booking Confirmation</h1>
            <p>Dear ${booking.user.name},</p>
            <p>Thank you for booking with Quickshow! Here are your booking details:</p>
            <ul>
                <li><strong>Movie:</strong> ${booking.show.movie.title}</li>
                <li><strong>Showtime:</strong> ${new Date(booking.show.startTime).toLocaleString()}</li>
                <li><strong>Seats:</strong> ${booking.bookedSeats.join(', ')}</li>
                <li><strong>Total Amount:</strong> $${booking.amount}</li>
            </ul>
            <p>Please proceed to payment using the following link: <a href="${booking.paymentLink}">Pay Now</a></p>
            <p>We look forward to seeing you at the show!</p>
            <p>Best regards,<br/>The Quickshow Team</p>
            `

            
        })
    
    }

);







export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation, releaseSeatsAndDeleteBooking,
    sendBookingConfirmationEmail
];


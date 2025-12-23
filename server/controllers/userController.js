// // api controller function to get user bookings
// import Booking from '../models/Booking.js';
// import { clerkClient } from '@clerk/express';
// import Movie from '../models/Movie.js';



// export const getUserBookings = async (req, res) => {
//     try {
//         const user = req.auth().userId;

//         const bookings = await Booking.find({user}).populate({
//             path: 'show',
//             populate: {path: 'movie'}
//         }).sort({createdAt: -1});

//         res.json({success: true, bookings});

//     } catch (error) {
//         console.error(error);
//         res.json({success: false, message: error.message});
//     }
// };


// // api controller function to update favorite movie in clerk user metadata

// export const updateFavorite = async (req, res) => {
//     try {
//         const { movieId } = req.body;
//         const { userId } = req.auth().userId;

//         const user = await clerkClient.users.getUser(userId);
       

//         if (!user.privateMetadata.favorites) {
//             user.privateMetadata.favorites = [];
//         }else {
//             user.privateMetadata.favorites = user.privateMetadata.favorites.filter(item => item !== movieId);
//         }

//         if (!user.privateMetadata.favorites.includes(movieId)) {
//             user.privateMetadata.favorites.push(movieId);
//         }

//         await clerkClient.users.updateUserMetadata(userId, {
//             privateMetadata: user.privateMetadata
//             });

//         res.json({ success: true, message: 'Favorite movie updated' });

//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// };


// export const getFavorite = async (req, res) => {
//     try {
//         const user = await clerkClient.users.getUser(req.auth().userId);

//         const favorites = user.privateMetadata.favorites;

//         // getting moives from db

//         const movies = await Movie.find({_id: {$in: favorites}});

//         res.json({ success: true, movies });

//     } catch (error) {
//         console.error(error);
//         res.json({ success: false, message: error.message });
//     }
// };









import Booking from '../models/Booking.js';
import { clerkClient } from '@clerk/express';
import Movie from '../models/Movie.js';

// GET USER BOOKINGS
export const getUserBookings = async (req, res) => {
    try {
        const userId = req.auth.userId;  // FIXED ✔

        const bookings = await Booking.find({ user: userId })
            .populate({
                path: 'show',
                populate: { path: 'movie' }
            })
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};


// UPDATE FAVORITE MOVIES
export const updateFavorite = async (req, res) => {
    try {
        const { movieId } = req.body;
        const userId = req.auth.userId;  // FIXED ✔

        const user = await clerkClient.users.getUser(userId);

        let favorites = user.privateMetadata.favorites || [];

        // toggle system
        if (favorites.includes(movieId)) {
            favorites = favorites.filter(item => item !== movieId);
        } else {
            favorites.push(movieId);
        }

        await clerkClient.users.updateUserMetadata(userId, {
            privateMetadata: { favorites }
        });

        res.json({ success: true, message: 'Favorite movie updated' });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// GET FAVORITE MOVIES
export const getFavorite = async (req, res) => {
    try {
        const userId = req.auth.userId;  // FIXED ✔
        const user = await clerkClient.users.getUser(userId);

        const favorites = user.privateMetadata.favorites || [];

        const movies = await Movie.find({ _id: { $in: favorites } });

        res.json({ success: true, movies });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

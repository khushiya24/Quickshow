// import { clerkClient } from "@clerk/express";

// export const protectAdmin = async (req, res, next) => {
//     try{
//         const { userId } = req.auth();
//         const user = await clerkClient.users.getUser(userId);

//         if(user.privateMetadata.role !== 'admin'){
//             return  res.json({ success: false, message: "not authorized" });
//         }
//         next();
        
//     } catch (error) {
        
//         return res.json({ success: false, message: "not authorized" });
//     }
// };


import { requireAuth, clerkClient } from "@clerk/express";

export const protectAdmin = [
    requireAuth(), // ensures user is logged in
    async (req, res, next) => {
        try {
            const userId = req.auth.userId;
            const user = await clerkClient.users.getUser(userId);

            if (user.privateMetadata?.role !== "admin") {
                return res.status(403).json({ success: false, message: "Not authorized" });
            }

            next();
        } catch (error) {
            console.error("Admin auth error:", error);
            return res.status(401).json({ success: false, message: "Not authorized" });
        }
    }
];

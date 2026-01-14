// import { LayoutDashboardIcon, ListCollapseIcon, ListIcon, PlusSquareIcon } from 'lucide-react'
// import React from 'react'
// import { NavLink, useLocation } from 'react-router-dom'
// import { assets } from '../../assets/assets'

// const AdminSidebar = () => {

//     const user = {
//         firstName: 'Admin',
//         lastName: 'User',
//         imageUrl: assets.profile,
//     }

//     const location = useLocation(); // For active indicator on refresh

//     const adminNavlinks = [
//         { name: 'Dashboard', path: '/admin', icon: LayoutDashboardIcon },
//         { name: 'Add Shows', path: '/admin/add-shows', icon: PlusSquareIcon },
//         { name: 'List Shows', path: '/admin/list-shows', icon: ListIcon },
//         { name: 'List Bookings', path: '/admin/list-bookings', icon: ListCollapseIcon },
//     ]

//     return (
//         <div className='h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-gray-300/20 text-sm'>
            
//             {/* Profile */}
//             <img className='h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto' src={user.imageUrl} alt="sidebar" />
//             <p className='mt-2 text-base max-md:hidden'>{user.firstName} {user.lastName}</p>

//             {/* Navigation */}
//             <div className='w-full'>
//                 {adminNavlinks.map((link, index) => {
//                     const Icon = link.icon;

//                     return (
//                         <NavLink
//                             key={index}
//                             to={link.path}
//                             className={({ isActive }) =>
//                                 `relative flex items-center gap-2 w-full py-2.5 md:pl-10 first:mt-6 
//                                  text-gray-400 hover:bg-primary/10 rounded-md transition 
//                                  ${isActive ? 'bg-primary/15 text-primary' : ''}`
//                             }
//                         >
//                             <Icon className="w-5 h-5" />
//                             <p className='max-md:hidden'>{link.name}</p>

//                             {/* Active Indicator */}
//                             <span
//                                 className={`w-1.5 h-10 rounded-md right-0 absolute ${
//                                     location.pathname === link.path ? 'bg-primary' : ''
//                                 }`}
//                             />
//                         </NavLink>
//                     );
//                 })}
//             </div>

//         </div>
//     )
// }

// export default AdminSidebar













// import {
//   LayoutDashboardIcon,
//   ListCollapseIcon,
//   ListIcon,
//   PlusSquareIcon,
// } from "lucide-react";
// import { NavLink, useLocation } from "react-router-dom";
// import { useEffect, useState } from "react";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import axios from "axios";

// const AdminSidebar = () => {
//   const location = useLocation();
//   const { getToken, isLoaded, isSignedIn } = useAuth();
//   const { user } = useUser();

//   const [isAdmin, setIsAdmin] = useState(false);
//   const [loading, setLoading] = useState(true);

//   const adminNavlinks = [
//     { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
//     { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
//     { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
//     { name: "List Bookings", path: "/admin/list-bookings", icon: ListCollapseIcon },
//   ];

//   useEffect(() => {
//     if (!isLoaded || !isSignedIn) return;

//     const checkAdmin = async () => {
//       try {
//         const token = await getToken({ template: "default" });

//         console.log("ADMIN TOKEN:", token); // DEBUG (remove later)

//         await axios.get(
//           `${import.meta.env.VITE_API_URL}/api/admin/is-admin`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         setIsAdmin(true);
//       } catch (error) {
//         console.error("Admin check failed:", error?.response?.status);
//         setIsAdmin(false);
//       } finally {
//         setLoading(false);
//       }
//     };

//     checkAdmin();
//   }, [isLoaded, isSignedIn]);

//   if (!isLoaded || loading || !isAdmin) return null;

//   return (
//     <div className="h-[calc(100vh-64px)] md:flex flex-col items-center pt-8 max-w-13 md:max-w-60 w-full border-gray-300/20 text-sm">
//       <img
//         className="h-9 md:h-14 w-9 md:w-14 rounded-full mx-auto"
//         src={user?.imageUrl}
//         alt="admin"
//       />
//       <p className="mt-2 text-base max-md:hidden">
//         {user?.firstName} {user?.lastName}
//       </p>

//       <div className="w-full">
//         {adminNavlinks.map((link, index) => {
//           const Icon = link.icon;

//           return (
//             <NavLink
//               key={index}
//               to={link.path}
//               className={({ isActive }) =>
//                 `relative flex items-center gap-2 w-full py-2.5 md:pl-10 first:mt-6 
//                  text-gray-400 hover:bg-primary/10 rounded-md transition 
//                  ${isActive ? "bg-primary/15 text-primary" : ""}`
//               }
//             >
//               <Icon className="w-5 h-5" />
//               <p className="max-md:hidden">{link.name}</p>
//               <span
//                 className={`w-1.5 h-10 rounded-md right-0 absolute ${
//                   location.pathname === link.path ? "bg-primary" : ""
//                 }`}
//               />
//             </NavLink>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default AdminSidebar;








import {
  LayoutDashboardIcon,
  ListCollapseIcon,
  ListIcon,
  PlusSquareIcon,
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const AdminSidebar = () => {
  const location = useLocation();
  const { user } = useUser();

  const adminNavlinks = [
    { name: "Dashboard", path: "/admin", icon: LayoutDashboardIcon },
    { name: "Add Shows", path: "/admin/add-shows", icon: PlusSquareIcon },
    { name: "List Shows", path: "/admin/list-shows", icon: ListIcon },
    { name: "List Bookings", path: "/admin/list-bookings", icon: ListCollapseIcon },
  ];

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col items-center pt-8 w-60 border-r border-gray-300/20 text-sm">
      <img
        className="h-14 w-14 rounded-full"
        src={user?.imageUrl}
        alt="admin"
      />
      <p className="mt-2 text-base">
        {user?.firstName} {user?.lastName}
      </p>

      <div className="w-full mt-6">
        {adminNavlinks.map((link, index) => {
          const Icon = link.icon;

          return (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full py-3 pl-6 
                 text-gray-400 hover:bg-primary/10 transition
                 ${isActive ? "bg-primary/15 text-primary" : ""}`
              }
            >
              <Icon className="w-5 h-5" />
              {link.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export default AdminSidebar;

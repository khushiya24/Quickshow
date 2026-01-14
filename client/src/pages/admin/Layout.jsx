// import React from 'react'
// import AdminNavbar from '../../components/admin/AdminNavbar'
// import AdminSidebar from '../../components/admin/AdminSidebar'
// import { Outlet } from 'react-router-dom'

// const Layout = () => {
//   return (
//     <>
//     <AdminNavbar />
//     <div>
//         <AdminSidebar/>
//         <div className='flex-1 px-4 py-10 ,d:px-10 h-[calc(100vh-64px)] overflow-y-auto'>
//         <Outlet/>
//     </div>

//     </div>
    
      
//     </>
//   )
// }

// export default Layout


// import React, { useEffect } from 'react'
// import AdminNavbar from '../../components/admin/AdminNavbar'
// import AdminSidebar from '../../components/admin/AdminSidebar'
// import { Outlet } from 'react-router-dom'
// import { useAppContext } from '../../context/AppContext'
// import Loading from '../../components/Loading'

// const Layout = () => {

//   const {isAdmin, fetchIsAdmin} = useAppContext();

//   useEffect (() => {
//     fetchIsAdmin()
//   }, [])

  
//   return isAdmin ? (
//     <>
//       <AdminNavbar />

//       <div className="flex">
//         <AdminSidebar />

//         <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   ) : <Loading />
// }

// export default Layout












// import React, { useEffect } from 'react';
// import { Outlet } from 'react-router-dom';
// import AdminNavbar from '../../components/admin/AdminNavbar';
// import AdminSidebar from '../../components/admin/AdminSidebar';
// import Loading from '../../components/Loading';
// import { useAppContext } from '../../context/AppContext';
// import { SignIn } from '@clerk/clerk-react';

// const Layout = () => {
//   const { user, isAdmin, fetchIsAdmin } = useAppContext();

//   useEffect(() => {
//     fetchIsAdmin();
//   }, []);

//   // Waiting for fetch
//   if (isAdmin === null) return <Loading />;

//   // Not logged in
//   if (!user) return <SignIn fallbackRedirectUrl="/admin" />;

//   // Logged in but not admin
//   if (!isAdmin)
//     return (
//       <div className="min-h-screen flex justify-center items-center">
//         <h2 className="text-xl font-semibold text-red-500">
//           You are not authorized to access admin dashboard
//         </h2>
//       </div>
//     );

//   // Admin view
//   return (
//     <>
//       <AdminNavbar />
//       <div className="flex">
//         <AdminSidebar />
//         <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Layout;



import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../../components/admin/AdminNavbar';
import AdminSidebar from '../../components/admin/AdminSidebar';

const Layout = () => {

  return (
    <>
      <AdminNavbar />
      <div className="flex">
        <AdminSidebar />
        <div className="flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px)] overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;

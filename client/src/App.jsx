import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Movies from './pages/Movies'
import MyBookings from './pages/MyBookings'
import MovieDetails from './pages/MovieDetails'
import SeatLayout from './pages/SeatLayout'
import Footer from './components/Footer'
import Favorite from './pages/Favorite'
import { Toaster } from 'react-hot-toast'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddShows from './pages/admin/AddShows'
import ListShows from './pages/admin/ListShows'
import ListBookings from './pages/admin/ListBookings'
import { SignIn } from '@clerk/clerk-react'
import { useAppContext } from './context/AppContext'

const App = () => {

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  const { user, isAdmin } = useAppContext();


  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/movies' element={<Movies />} />
        <Route path='/movies/:id' element={<MovieDetails />} />
        <Route path='/movies/:id/:date' element={<SeatLayout />} />
        <Route path='/my-bookings' element={<MyBookings />} />
        <Route path='/favorite' element={<Favorite />} />
        <Route
  path="/admin/*"
  element={
    user && isAdmin ? (
      <Layout />
    ) : user ? (
      <div className="min-h-screen flex justify-center items-center">
        <h2 className="text-xl font-semibold text-red-500">
          You are not authorized to access admin dashboard
        </h2>
      </div>
    ) : (
      <div className="min-h-screen flex justify-center items-center">
        <SignIn fallbackRedirectUrl="/admin" />
      </div>
    )
  }
>

  <Route index element={<Dashboard />} />
  <Route path="add-shows" element={<AddShows />} />
  <Route path="list-shows" element={<ListShows />} />
  <Route path="list-bookings" element={<ListBookings />} />
</Route>

      </Routes>

      {!isAdminRoute && <Footer />}
      
      <Toaster />
    </>
  )
}

export default App











// import React from 'react'
// import Navbar from './components/Navbar'
// import { Route, Routes, useLocation } from 'react-router-dom'
// import Home from './pages/Home'
// import Movies from './pages/Movies'
// import MyBookings from './pages/MyBookings'
// import MovieDetails from './pages/MovieDetails'
// import SeatLayout from './pages/SeatLayout'
// import Footer from './components/Footer'
// import Favorite from './pages/Favorite'
// import { Toaster } from 'react-hot-toast'
// import Layout from './pages/admin/Layout'
// import Dashboard from './pages/admin/Dashboard'
// import AddShows from './pages/admin/AddShows'
// import ListShows from './pages/admin/ListShows'
// import ListBookings from './pages/admin/ListBookings'
// import { useAppContext } from './context/AppContext'
// import { SignIn } from '@clerk/clerk-react'

// const App = () => {
//   const location = useLocation();
//   const isAdminRoute = location.pathname.startsWith("/admin");

//   const { user, isAdmin } = useAppContext();

//   return (
//     <>
//       <Navbar />

//       <Routes>
//         {/* Public Routes */}
//         <Route path='/' element={<Home />} />
//         <Route path='/movies' element={<Movies />} />
//         <Route path='/movies/:id' element={<MovieDetails />} />
//         <Route path='/movies/:id/:date' element={<SeatLayout />} />
//         <Route path='/my-bookings' element={<MyBookings />} />
//         <Route path='/favorite' element={<Favorite />} />

//         {/* Admin Routes */}
//         <Route
//           path="/admin"
//           element={
//             user && isAdmin ? (
//               <Layout />
//             ) : user ? (
//               <div className="min-h-screen flex justify-center items-center">
//                 <h2 className="text-xl font-semibold text-red-500">
//                   You are not authorized to access the admin dashboard
//                 </h2>
//               </div>
//             ) : (
//               <div className="min-h-screen flex justify-center items-center">
//                 <SignIn redirectUrl="/admin" />
//               </div>
//             )
//           }
//         >
//           <Route index element={<Dashboard />} />
//           <Route path="add-shows" element={<AddShows />} />
//           <Route path="list-shows" element={<ListShows />} />
//           <Route path="list-bookings" element={<ListBookings />} />
//         </Route>
//       </Routes>

//       {!isAdminRoute && <Footer />}

//       <Toaster />
//     </>
//   )
// }

// export default App



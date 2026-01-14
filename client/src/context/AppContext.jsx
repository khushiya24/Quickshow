// import { createContext, useContext, useEffect, useState } from "react";
// import axios from "axios";
// import { useAuth, useUser } from "@clerk/clerk-react";
// import { useLocation, useNavigate } from "react-router-dom";


// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL


// export const AppContext = createContext();

// export const AppProvider = ({children}) => {

//     const [isAdmin, setIsAdmin] = useState(false)
//     const [shows, setShows] = useState([])
//     const [FavoriteMovies, setFavoriteMovies] = useState([])

//     const {user} = useUser()
//     const {getToken} = useAuth()
//     const location = useLocation()
//     const navigate = useNavigate()

//     const fetchIsAdmin = async () => {
//         try {
//             const {data} = await axios.get('/api/admin/is-admin' , {headers: {Authorization: `Bearer ${await getToken()}` }})
//             setIsAdmin(data.isAdmin)

//             if(!data.isAdmin && location.pathname.startsWith('/admin')){
//                 navigate('/')
//                 toast.error('Your are not authorize to access admin dashboard')

//             }

//         } catch (error) {
//             console.error(error)
//         }
//     }

//     const fetchShows = async () => {
//         try{
//             const {data} = await axios.get('/api/show/all')
//             if(data.success){
//                 setShows(data.shows)
//             }else{
//                 toast.error(data.message)
//             }

//         } catch (error) {
//             console.error(error)
//         }
//     }

//     const fetchFavoriteMovies = async () => {
//         try {
//             const {data } = await axios.get('/api/user/favorites', {headers: {Authorization: `Bearer ${await getToken()}` }})

//             if(data.success){
//                 setFavoriteMovies(data.movies)
//             }else{
//                 toast.error(data.message)
//             }



//         } catch(error) {
//             console.error(error)

//         }

//     }

//     useEffect(() => {
//         fetchShows()
//     }, [])

//     useEffect(() => {
//         if(user) {
//             fetchIsAdmin()
//             fetchFavoriteMovies()
//         }
//     }, [user])

//     const value = {
//         axios,
//         fetchIsAdmin,
//         user, getToken, navigate, isAdmin, shows,
//         FavoriteMovies, fetchFavoriteMovies
//     };


//     return (
//         <AppContext.Provider>
//             {children}
//         </AppContext.Provider>
//     )
// }

// export const useAppContext = ()  => useContext(AppContext);



import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth, useUser } from "@clerk/clerk-react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(null);
  const [shows, setShows] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const { user } = useUser();
  const { getToken } = useAuth();

  const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });

  // ✅ FIX: interceptor inside provider so getToken exists
  axiosInstance.interceptors.request.use(async (config) => {
    try {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (err) {
      console.log("Token error:", err);
    }
    return config;
  });

  const image_base_url = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  // Check admin
  const fetchIsAdmin = async () => {
    if (!user) return;

    try {
      const token = await getToken();
      const { data } = await axios.get("/api/admin/is-admin", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setIsAdmin(data.isAdmin);
    } catch (error) {
      console.error("Admin check failed:", error);
      setIsAdmin(false);
    }
  };

  // Fetch shows
  const fetchShows = async () => {
    try {
      const { data } = await axios.get("/api/show/all");
      if (data.success) setShows(data.shows);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchFavoriteMovies = async () => {
    if (!user) return;

    try {
      const token = await getToken();
      const { data } = await axios.get("/api/user/favorite", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) setFavoriteMovies(data.movies);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchShows();
  }, []);

  useEffect(() => {
    if (user) {
      fetchIsAdmin();
      fetchFavoriteMovies();
    } else {
      setIsAdmin(null);
    }
  }, [user]);

  return (
    <AppContext.Provider
      value={{
        axios: axiosInstance,
        getToken,
        user,
        isAdmin,
        shows,
        fetchIsAdmin,
        favoriteMovies,
        fetchFavoriteMovies,
        image_base_url,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);

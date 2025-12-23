import express from 'express';
import { addShow, getNowPlayingMovies, getShows, getShow } from '../controllers/showController.js';



const showRouter = express.Router();
showRouter.get('/now-playing', getNowPlayingMovies)
showRouter.post('/add-show', addShow)
showRouter.get('/all', getShows)
showRouter.get('/:movieId', getShow)

export default showRouter;
import Axios from 'axios';

const URL = 'https://api.themoviedb.org/3';
const API_KEY = "4b0daa0f73d9fc08b80a9e8580cac7fa";

export default (language = "es-ES") => {
    const GET = async (route, data = {}) => 
        (await Axios.get(`${URL}/${route}`, {
            params: {
                api_key: API_KEY,
                language,
                ...data
            }
        })).data;
    
    const movieGenres = () => GET('genre/movie/list');
    const seriesGenres    = () => GET('genre/tv/list');

    const popularMovies = (filter) => GET('movie/popular', filter);
    const popularSeries = (filter) => GET('tv/popular', filter);

    const movie = (id) => GET(`movie/${id}`);
    const movieVideos = (id) => movie(`${id}/videos`);

    const serie = (id) => GET(`tv/${id}`);
    const serieVideos = (id) => serie(`${id}/videos`);

    return {
        GET,
        
        movieGenres,
        seriesGenres,

        popularMovies,
        popularSeries,

        movie,
        movieVideos,

        serie,
        serieVideos
    };
}
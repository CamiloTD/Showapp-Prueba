import { Component } from 'react';
import Layout from '../components/layout/layout';
import MovieDB from '../api/moviedb';

export default class MainPage extends Component {
    
    constructor (props) {
        super();
        
        this.state = {
            genres: props.genres,
            raw_content: props.raw_content,
            full_movies: props.full_movies
        };
    }

    getContentFromMovies (full_movies) {
        let movies = [];

        for(let i=0, movie;movie=full_movies[i++];) {
            let movie_genres = movie.genres.map(({ name }) => name).join(", ");
            let hours = movie.runtime/60;
            let duration = `${Math.floor(hours)}h ${Math.floor((hours % 1) * 60)}m`;

            movie_genres = movie_genres.substring(0, movie_genres.lastIndexOf(", "))
                 +  " y" + movie_genres.substring(movie_genres.lastIndexOf(", ") + 1);

            movies.push({
                title: movie.title,
                duration: duration,
                rating: movie.vote_average,
                picture: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
                description: movie.overview.length < 300? movie.overview: movie.overview.substring(0, 200) + "...",
                release: movie.release_date,
                genres: movie_genres,
                isFavorite: false,
                hasTrailer: movie.trailer !== undefined
            });
        }

        return movies;
    }

    render () {
        let { genres, raw_content, full_movies } = this.state;
        let movies = this.getContentFromMovies(full_movies);

        return (
            <Layout
                active="Movies"
                description="Descubra nuevas películas y programas de televisión"
                genres={ genres }
                content={ movies }
            ></Layout>
        );

    }

    static async getInitialProps (props) {
        const API = MovieDB("es-ES");
        const _genres = (await API.movieGenres()).genres || [];
        const _movies = await API.popularMovies();
        const movies = [];
        
        const genres = {};
        _genres.forEach(({ id, name }) => genres[id] = name);

        for(let i=0, movie;movie=_movies.results[i++];) {
            let details = await API.movie(movie.id);
            let trailer = await API.movieVideos(movie.id);
            let _results = trailer.results;

            if(_results && _results[0])
                details.trailer = `https://youtube.com/watch?v=${_results[0].key}`;

            movies.push(details);
        }

        return {
            genres: genres || {},
            raw_content: _movies,
            full_movies: movies
        };
    }

}
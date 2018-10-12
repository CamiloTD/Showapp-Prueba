import { Component } from 'react';
import Layout from '../components/layout/layout';
import MovieDB from '../api/moviedb';

async function getMoviesFrom (filter, page = 1) {
    let API = MovieDB("es-ES");
    let _movies;

    if(!filter)
        _movies = await API.popularMovies({ page });
    else if(typeof filter === "string") {        
        _movies = await API.GET('search/movie', { page, query: filter });

    } else {
        const { year, genre } = filter;
        let x = {};

        x.page = page;
        if(year) x.year = year;
        if(genre) x.with_genres = genre;
        
        _movies = await API.GET('discover/movie', x);
    }

    for(let i=0, movie;movie=_movies.results[i++];) {
        let trailer = await API.movieVideos(movie.id);
        let _results = trailer.results;

        if(_results && _results[0])
            movie.trailer = _results[0].key;
    }

    return _movies;
}


export default class MainPage extends Component {
    
    constructor (props) {
        super();
        
        this.state = {
            genres: props.genres,
            raw_content: props.raw_content,
            full_movies: props.full_movies,
            favs: props.favs
        };
    }

    async setContent(page = 1, filter) {
        if(typeof filter !== "string") {
            let _filter = this.state.filter;

            if(typeof _filter === "string") {
                filter = _filter;
            } else {
                if(filter && _filter) {
                    if(_filter.year && filter.year === undefined)
                        filter.year = _filter.year;
                    if(_filter.genre && filter.genre === undefined)
                        filter.genre = _filter.genre;
                    if(_filter.name && filter.name === undefined)
                        filter.name = _filter.name;
                }
                
                if(filter) {
                    if(!filter.year && !filter.genre && !filter.name)
                        filter = null;
                    else {
                        if(filter.year === null) filter.year = undefined;
                        if(filter.genre === null) filter.genre = undefined;
                        if(filter.name === null) filter.name = undefined;
                    }
                }
            }
        }

        const _movies = await getMoviesFrom(filter, page);

        this.setState({ full_movies: _movies, filter });
    }

    setFavorite(id) {
        let { favs, genres } = this.state;

        if(favs.movies[id]) delete favs.movies[id];
        else {
            let results = this.state.full_movies.results;
            let movie = null;

            for(let i in results){
                if(results[i].id === id){
                    movie = results[i];
                    break;
                }
            }
            
            if(movie) favs.movies[id] = this.getContentFromMovie(movie, genres, favs);
        }

        localStorage.setItem("favs", JSON.stringify(favs));

        this.setState({ favs })
    }

    getContentFromMovie (movie, genres, favs) {
        let movie_genres = movie.genre_ids.map((id) => genres[id]).join(", ");
        let hours = movie.runtime/60;
        let duration = `${Math.floor(hours)}h ${Math.floor((hours % 1) * 60)}m`;

        if(movie_genres.indexOf(",") + 1)
            movie_genres = movie_genres.substring(0, movie_genres.lastIndexOf(", "))
                +  " y" + movie_genres.substring(movie_genres.lastIndexOf(", ") + 1);

        return ({
            id: movie.id,
            title: movie.title,
            duration: duration,
            rating: movie.vote_average,
            picture: "https://image.tmdb.org/t/p/w500" + movie.poster_path,
            description: movie.overview.length < 300? movie.overview: movie.overview.substring(0, 200) + "...",
            release: movie.release_date,
            genres: movie_genres,
            isFavorite: favs.movies[movie.id],
            trailer: movie.trailer
        });
    }

    getContentFromMovies (_movies) {
        let { genres, favs } = this.state;
        let full_movies = _movies.results;
        let movies = [];

        for(let i=0, movie;movie=full_movies[i++];)
            movies.push(this.getContentFromMovie(movie, genres, favs));

        movies.totalPages = _movies.total_pages;
        return movies;
    }

    render () {
        let { genres, full_movies } = this.state;
        let movies = this.getContentFromMovies(full_movies);
        let resetCat = typeof filter === "string";

        return (
            <Layout
                active="Movies"
                description="Descubra nuevas películas y programas de televisión"

                genres={ genres }
                content={ movies }

                onPageChange={ (n) => this.setContent(n) }
                paginationSize={movies.totalPages}

                onGenreChange={ (id) => this.setContent(1, id? { genre: id } : { genre: null }) }
                onYearChange={ (id, y) => this.setContent(1 , y? { year: y } : { year: null }) }

                onSearchChange={(name) => {
                    this.setContent(1, name);
                }}

                onFavorite={ (id) => this.setFavorite(id) }

                reset={ resetCat }
            />
        );

    }

    componentDidMount () {
        const favs = JSON.parse(localStorage.getItem("favs") || '{ "movies": {}, "series": {} }');

        this.setState({ favs });
    }

    static async getInitialProps (props) {
        const API = MovieDB("es-ES");

        const _genres = (await API.movieGenres()).genres || [];
        
        const genres = {};
        _genres.forEach(({ id, name }) => genres[id] = name);

        const movies = await getMoviesFrom(null, 1);

        return {
            genres: genres || {},
            full_movies: movies,
            meta: movies.meta,
            favs: { movies: {}, series: {} }
        };
    }

}
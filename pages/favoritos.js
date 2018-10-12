import { Component } from 'react';
import Layout from '../components/layout/layout';
import MovieDB from '../api/moviedb';


export default class MainPage extends Component {
    
    constructor (props) {
        super();
        
        this.state = {
            genres: { "movies" : "Movie", "series": "Serie" },
            full_movies: { total_pages: 0, total_results: 0, results: [] },
            favs: { movies: {}, series: {} }
        };
    }

    getSeriesFrom (filter, page = 1) {
        let movies = this.state.main_content;
        
        if(!filter || !Object.keys(filter).length) return movies;
    
        let ret = [];
    
        if(typeof filter === "string") movies.forEach((movie) => {
            if(movie.title.toLowerCase().indexOf(filter.toLowerCase()) + 1)
                ret.push(movie);
        });
        
        else if(typeof filter === "object") {
            let { favs } = this.state;

            if(filter.genre) {
                let x = favs[filter.genre];

                for(let i in x) ret.push(x[i]);
            } else ret = movies;

            if(filter.year) {
                let X = [];

                ret.forEach((movie) => {
                    if(movie.release.indexOf(filter.year) + 1)
                        X.push(movie);
                });

                ret = X;
            }
        }

        let totalPages = Math.ceil(ret.length / 20);
        let totalResults = ret.length;

        ret = ret.slice((page - 1)*20);
    
        ret.totalPages = totalPages;
        ret.totalResults = totalResults;
        return ret;
    }

    async setContent(page = 1, filter) {
        if(typeof filter !== "string") {
            let _filter = this.state.filter;

            if(typeof _filter === "string") {
                filter = _filter;
            } else {
                if(filter !== null && _filter) {
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

        const _movies = await this.getSeriesFrom(filter, page);

        this.setState({ movies: _movies, filter });
    }

    setFavorite(id) {
        let { favs } = this.state;
        let _movies = this.state.movies;

        if(favs.series[id] || favs.movies[id]) {
            delete favs.series[id];
            delete favs.movies[id];
        }

        localStorage.setItem("favs", JSON.stringify(favs));

        let { movies, series } = favs;
        let content = [];

        for(let i in movies) content.push(movies[i]);
        for(let j in series) content.push(series[j]);
        
        content.totalPages = Math.ceil((movies.length + series.length) / 20);
        
        let X = [];

        _movies.forEach((movie, i) => {
            if(_movies[i] && _movies[i].id !== id)
                X.push(_movies[i]);
        });
        
        X.totalPages = Math.ceil((X.length) / 20);

        this.setState({ favs: favs, main_content: content, movies: X })
    }

    render () {
        let { genres, movies = [] } = this.state;

        movies.forEach((movie) => movie.isFavorite = true);

        return (
            <Layout
                active="Favoritos"
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
            />
        );

    }

    componentDidMount () {
        const favs = JSON.parse(localStorage.getItem("favs") || '{ "movies": {}, "series": {} }');
        if(!favs.movies) favs.movies = {};
        if(!favs.series) favs.series = {};

        let { movies, series } = favs;
        let content = [];

        for(let i in movies) content.push(movies[i]);
        for(let j in series) content.push(series[j]);
        
        content.totalPages = Math.ceil((movies.length + series.length) / 20);

        this.setState({ favs, movies: content, main_content: content });
    }

}
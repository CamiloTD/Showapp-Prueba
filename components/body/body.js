import '../../styles/body.styl';
import BodySelect from './body-select';
import MovieDBCard from '../shared/moviedb-card';
import Pagination from '../pagination';
import PlayerModal from '../player-modal';
import { Component } from 'react';

export default class Body extends Component {
    state = { activeTrailer: null }

    showTrailer (trailer) {
        this.setState({ activeTrailer: trailer });
    }

    render () {
        let {
                description, genres, content = [],
                onPageChange, paginationSize,
                onGenreChange, onYearChange,
                onFavorite
            } = this.props;

        let { activeTrailer } = this.state;    
        let years = {};
        let actual_year = (new Date()).getFullYear();

        for(let i=actual_year;i>=1900;i--)
            years[" "+i] = i;

        return (
            <div className="body-main">
                <span className="description">{ description }</span>
                <div className="menu">
                    <label>Año</label>
                    <label>Género</label>

                    <BodySelect data={years} placeholder="Cualquiera" onChange={ onYearChange }/>
                    <BodySelect
                        data={ genres }
                        placeholder="Filtrar por..."
                        onChange = { onGenreChange }
                    />
                </div>

                <Pagination
                    buttons={5}
                    size={paginationSize}
                    onChange={onPageChange}
                />

                <div className="content">
                    {
                      content.map((item, i) =>
                        <MovieDBCard
                            key={ i }
                            showTrailer={() => { this.showTrailer(item.trailer) }}
                            onFavorite={ () => onFavorite && onFavorite(item.id) }
                            { ...item }
                        />
                      )
                    }
                </div>

                { activeTrailer && <PlayerModal video={ activeTrailer } hideModal={ () => this.showTrailer(null) }/> }
            </div>
        );
    }
}
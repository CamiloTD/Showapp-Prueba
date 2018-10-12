import '../../styles/moviedb-card.styl';
import Icon from '../icons';

export default ({
        picture, title, rating, duration, release, genres, description, trailer, isFavorite,
        showTrailer, onFavorite
    }) => (
    <div className="moviedb-card">
        <div className="picture">
            <img src={picture} width="100%"></img>
        </div>
        <div className="details">
            <div className="card-header">
                <div className="title">{ title }</div>
                <div className="rating">{ rating }</div>
            </div>

            <div className="card-details">
                { release } | { genres }
            </div>

            <div className="card-description">{ description }</div>
            <div className="card-actions">
                { 
                    trailer?
                    <button className="trailer-active" onClick={ showTrailer }>Ver Trailer</button> :
                    <button>Ver Trailer</button>
                }
                <div className={ isFavorite? "add-fav fav" : "add-fav" } onClick={ onFavorite }>
                    { isFavorite? "Quitar de favoritos" : "Agregar a favoritos" }
                    <Icon.heart fill={ isFavorite? "#e31b23" : null }/>
                </div>
            </div>
        </div>
    </div>
);
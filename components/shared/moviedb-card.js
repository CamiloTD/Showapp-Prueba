import '../../styles/moviedb-card.styl';
import Icon from '../icons';

export default ({ picture, title, rating, duration, release, genres, description, hasTrailer, isFavorite }) => (
    <div className="moviedb-card">
        <div className="picture">
            <img src={picture} width="100%"></img>
        </div>
        <div className="details">
            <div class="card-header">
                <div className="title">{ title }</div>
                <div className="rating">{ rating }</div>
            </div>

            <div class="card-details">
                { release } | { genres }
            </div>

            <div class="card-description">{ description }</div>
            <div class="card-actions">
                <button className={ hasTrailer? "trailer-active" : ""}>Ver Trailer</button>
                <div className={ isFavorite? "add-fav fav" : "add-fav" }>
                    Agregar a favoritos
                    <Icon.heart fill={ isFavorite? "#e31b23" : null }/>
                </div>
            </div>
        </div>
    </div>
);
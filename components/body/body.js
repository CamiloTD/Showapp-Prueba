import '../../styles/body.styl';
import BodySelect from './body-select';
import MovieDBCard from '../shared/moviedb-card';


export default ({ description, genres, content = [] }) => {
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

                <BodySelect data={years} placeholder="Cualquiera"/>
                <BodySelect
                    data={ genres }
                    placeholder="Filtrar por..."
                />
            </div>

            <div className="content">
                { content.map((item) => <MovieDBCard { ...item } />) }
            </div>
        </div>
    );
}
import '../../styles/search.styl';
import Icon from '../icons';

export default () => (
    <div className="search-main">
        <Icon.search />
        <input
            type="text"
            placeholder="Search for a movie, series and videos"
        />
    </div>
)
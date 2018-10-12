import '../../styles/search.styl';
import Icon from '../icons';

export default ({ onChange }) => (
    <div className="search-main">
        <Icon.search />
        <input
            type="text"
            placeholder="Search for a movie, series and videos"
            onKeyPress={(e) => {
                if(e.key === "Enter") onChange && onChange(e.target.value)
            }}

            onBlur={ (e) => onChange(e.target.value) }
        />
    </div>
)
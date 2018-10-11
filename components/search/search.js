import { MainStyle, InputStyle } from "../search/styles";
import Icon from '../icons';

export default () => (
    <div style={ MainStyle }>
        <Icon.search />
        <input
            type="text"
            placeholder="Search for a movie, series and videos"
            style={ InputStyle }
        />
    </div>
)
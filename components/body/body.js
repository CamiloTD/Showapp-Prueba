import '../../styles/body.styl';

export default ({ description }) => (
    <div className="body-main">
        <span className="description">{ description }</span>
        <div className="menu">
            <label>Año</label>
            <label>Género</label>

            <select></select>
            <select></select>
        </div>
    </div>
)
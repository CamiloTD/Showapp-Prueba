import Theme from '../../config/theme';

let MainStyle = {
    background: Theme.Search.background,
    display: 'grid',
    alignItems: 'center',
    paddingLeft: 42,
    gridTemplateColumns: '50px auto'
};

let InputStyle = {
    background: 'transparent',
    border: 'none',
    fontFamily: Theme.MainFont,
    fontSize: 14,
    fontStyle: 'italic',
    color: Theme.Search.color,
    opacity: 0.5949
};

export { MainStyle, InputStyle };
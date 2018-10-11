import Theme from '../../config/theme';

let MainStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr'
};

let NavStyle = {
    display: 'grid',
    alignItems: 'center',
    justifyItems: 'center',
    marginRight: 52,
    justifyContent: 'right',
    Item: {
        fontFamily: Theme.MainFont,
        fontSize: 16,
        fontWeight: 'bold',
        cursor: 'pointer',
        Active: {
            color: Theme.MainColor,
            borderBottom: '2px solid ' + Theme.MainColor,
            marginTop: 6,
            paddingBottom: 5
        }
    }
};

let LogoStyle = {
    display: 'grid',
    alignItems: 'center',
    height: '100%',
    marginLeft: 42
};

export { MainStyle, NavStyle, LogoStyle };
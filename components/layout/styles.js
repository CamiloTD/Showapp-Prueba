let Constants = {
    HeaderHeight: 64,
    SearchHeight: 37
};

let MainStyle = {
    display: 'grid',
    minHeight: '100vh',
    gridTemplateRows: `${Constants.HeaderHeight}px ${Constants.SearchHeight}px auto`
};

export { Constants, MainStyle };
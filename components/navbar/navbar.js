import Nav from './nav';
import Logo from './logo';

export default ({ menuItems, active }) => (
    <div className="navbar-main">
        <Logo />
        
        <Nav
            items={ menuItems }
            active={active}
            style={{
                gridTemplateColumns: `repeat(${menuItems.length}, 75.6px)`
            }}
        />

    </div>
);
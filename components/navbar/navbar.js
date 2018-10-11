import { MainStyle, NavStyle, LogoStyle } from './styles';
import Nav from './nav';
import Logo from './logo';

export default ({ menuItems, active }) => (
    <div style={MainStyle}>
        <div style={LogoStyle}>
            <Logo />
        </div>
        
        <Nav items={ menuItems } active={active} style={{
            gridTemplateColumns: `repeat(${menuItems.length}, 75.6px)`,
            ...NavStyle
        }} />

    </div>
);
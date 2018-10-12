import Link from 'next/link';
import '../../styles/navbar.styl';

export default ({ items = [], style, active }) => (
    <div style={style} className="nav">{
        items.map((item) => (
            <Link href={item.href} key={item.name} >
                <div className={ item.name == active? "item active" : "item" }>
                    { item.name }
                </div>
            </Link>
        ))
    }</div>
);
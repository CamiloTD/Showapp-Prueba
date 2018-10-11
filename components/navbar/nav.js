import Link from 'next/link';

export default ({ items = [], style, active }) => (
    <div style={style}>{
        items.map((item) => (
            <Link href={item.href}>
                <div style={item.name === active? { ...style.Item, ...style.Item.Active} : { ...style.Item }}>
                    { item.name }
                </div>
            </Link>
        ))
    }</div>
);
import { MainStyle } from './styles';
import { Component } from 'react';

import Head from 'next/head';
import Navbar from '../navbar/navbar';
import Search from '../search/search';
import navbarItems from './navbar-items';

export default class Layout extends Component {
    
    render () {
        let { active } = this.props;
        
        return (
            <div style={ MainStyle }>
                <Head>
                    <link rel="stylesheet" href="/static/styles.css" />
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
                </Head>

                <Navbar menuItems={navbarItems} active={active} />
                <Search />
            </div>
        );
    }
    
}
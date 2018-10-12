import { Component } from 'react';

import Head from 'next/head';
import Body from '../body/body';
import Navbar from '../navbar/navbar';
import Search from '../search/search';
import navbarItems from './navbar-items';

import '../../styles/global.styl';
import '../../styles/layout.styl';

export default class Layout extends Component {
    
    render () {
        let { active, description, genres, content } = this.props;

        return (
            <div className="layout-main">
                <Head>
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" />
                </Head>

                <Navbar menuItems={navbarItems} active={active} />
                <Search />
                <Body description={description} genres={genres} content={content} />
            </div>
        );
    }
    
}
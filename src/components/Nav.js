import React from 'react';
import { css } from 'glamor';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

const Nav = (props) => {
    return (
        <nav style={nav}>
            <div className="nav-wrapper">
                <a href="./App.js" className="brand-logo left" style={brandLogo}>
                    <i className={`fas fa-film ${logo}`}></i>Movie Search
                </a>
                <ul id="nav-mobile" className={`right ${navMenu}`}>
                    <li><a href="#anchor" className={`${navLink}`} onClick={props.getTopMovies}><i className="fas fa-trophy" style={icon}></i>Top Movies</a></li>
                    <li><a href="#anchor" className={`${navLink}`} onClick={props.getTopTvShows}><i className="fas fa-trophy" style={icon}></i>Top TV Shows</a></li>
                    <li><a href="#anchor" className={`${navLink}`} onClick={props.getMovieTrends}><i className="fas fa-chart-line" style={icon}></i>Popular Movies</a></li>
                    <li><a href="#anchor" className={`${navLink}`} onClick={props.getTvShowTrends}><i className="fas fa-chart-line" style={icon}></i>Popular TV Shows</a></li>
                    <li><a href="#anchor" className={`${navLink}`} onClick={props.getFavorites}><i className="fas fa-heart" style={icon}></i>Favorites</a></li>
                </ul>
            </div>
        </nav>
    )
}

const brandLogo = {
    fontFamily: "'Acme'"
}
let navLink = css({
    '@media(max-width: 1024px)': {
        padding: '0 10px'
    }
})

let navMenu = css({
    '@media(max-width: 992px)': {
        display: 'none'
    }
})
let logo = css({
    fontSize: "40px",
    marginLeft: "40px",
    marginRight: "5px",
    '@media(max-width: 600px)': {
        marginLeft: "0",
        marginRight: "5px !important"
    }
  })


const icon = {
    marginRight: "15px",
    fontSize: "20px",
    fontWeight: "700"
}

const nav = {
    position: "fixed",
    top: "0",
    zIndex: "10"
}

export default Nav
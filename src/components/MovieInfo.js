import React from 'react';
import MovieVideo from './MovieVideo';
import { css } from 'glamor';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

const MovieInfo = (props) => {
    return (
        <div className={`${modal}`}>
        <div className="modalWrapper" style={modalWrapper} onClick={props.closeMovieInfo}>
        </div>
        <div className={`${modalContent}`} style={modalContent}>
                <i className={`fas fa-times ${close}`} onClick={props.closeMovieInfo}></i>
            <div className="row">
                <div className="col s12 m3">
                    {props.currentMovie.poster_path == null ? <img src={`https://mmix.3dn.ru/no-poster.jpg`} alt={props.currentMovie.title} className={`${posterImg}`}/> : <img src={`http://image.tmdb.org/t/p/w185${props.currentMovie.poster_path}`} alt={props.title} className={`${posterImg}`}/>}
                </div>
                <div className="col s12 m9">
                    <div className="info-container">
                        {props.currentMovie.title === undefined ? <p style={infoTitle}><span style={infoName}>Title:</span> {props.currentMovie.name}</p> : <p style={infoTitle}><span style={infoName}>Title:</span> {props.currentMovie.title}</p>}
                        {props.currentMovie.release_date === undefined ? <p style={infoDate}><span style={infoName}>Year:</span> {props.currentMovie.first_air_date.substring(0,4)}</p> : <p style={infoDate}><span style={infoName}>Year:</span> {props.currentMovie.release_date.substring(0,4)}</p>}
                        <p style={infoOverview}><span style={infoName}>Overview:</span> {props.currentMovie.overview}</p>
                    </div>
                </div>
            </div>
            <div style={{textAlign: "center"}}>
            <MovieVideo movieTitle={props.currentMovie.title} TvTitle={props.currentMovie.name} dateMovie={props.currentMovie.release_date} dateTv={props.currentMovie.first_air_date} />
            </div>
        </div>
        </div>
    )
}

let modal = css({
    position: "fixed",
    zIndex: "9998",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
})

let modalContent = css({
    background: 'white',
    backgroundImage: 'linear-gradient(to bottom right,rgba(238, 110, 115, 0.6) 39.9%,rgba(38, 166, 154, 0.73) 100%)',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    position: "fixed",
    zIndex: "9999",
    width: "60%",
    height: "90%",
    top: "50%",
    left: "50%",
    overflow: 'auto',
    transform: "translate(-50%,-50%)",
    padding: "20px",
    '@media(max-width: 600px)': {
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: '100%',
        height: "90%",
    }
  })

let posterImg = css({
    width: '100%',
    height: 'auto',
    '@media(max-width: 600px)': {
    width: '50%',
    height: 'auto',
    margin: '0 auto'
    }
})

const modalWrapper = {
    position: "fixed",
    zIndex: "9998",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    overflow: "auto",
    background: "rgba(0, 0, 0, 0.6)"
}

let close =css({
    display: "block",
    position: "fixed",
    top: "10px",
    right: "35px",
    fontSize: "35px",
    cursor: "pointer",
    transition: "all .3s",
    ':hover': {
        transform: 'scale(1.2)'
      },
})

const infoTitle = {
    marginTop: "0",
    marginBottom: "0"
}
const infoDate = {
    marginTop: "10px"    
}
const infoOverview = {
    marginTop: "10px"    
}

const infoName = {
    fontFamily: "'Acme'",
    fontWeight: "bold"
}

export default MovieInfo
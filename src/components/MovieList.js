import React from 'react';
import Movie from './Movie';
import { css } from 'glamor';

const MovieList = (props) => {
    return (
        // <div style={{maxWidth: '1000px', textAlign: 'center'}}>
            <div className={`row ${movieList}`}>
                <div className={`col s12 ${wrap}`}>
                    {
                        props.movies.map((movie, i) => {
                            return (
                                <Movie key={i} votesId={props.votesId} addToFavorites={props.addToFavorites} favoritesId={props.favoritesId} removeFromFavorites={props.removeFromFavorites} movies={props.movies} favorites={props.favorites} viewMovieInfo={props.viewMovieInfo} movieId={movie.id} onStarClick={props.onStarClick} vote={movie.vote_average} image={movie.poster_path} title={movie.title} titleTv={movie.name} date={movie.release_date} dateTv={movie.first_air_date}/>
                            )
                        })
                    }
                </div>
            </div>
        // </div>
    )
}

let movieList = css({
    maxWidth: '1000px',
    marginLeft: 'auto !important',
    marginRight: 'auto !important'
})
let wrap = css({
    margin: '0 auto'
})

export default MovieList
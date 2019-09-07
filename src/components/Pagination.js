import React from 'react';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

const Pagination = (props) => {
    return (
        <div className="row">
            <div style={btnShowMore}>
                {
                    props.search === true ? <button className="pulse btn waves-effect waves-light" onClick={props.showMoreSearch}>SHOW MORE</button> : 
                    props.topMovie === true ? <button className="pulse btn waves-effect waves-light" onClick={props.showMoreTopMovies}>SHOW MORE</button> :
                    props.topTv === true ? <button className="pulse btn waves-effect waves-light" onClick={props.showMoreTopTv}>SHOW MORE</button> :
                    props.trendMovie === true ? <button className="pulse btn waves-effect waves-light" onClick={props.showMoreMovieTrends}>SHOW MORE</button> :
                    props.trendTv === true ? <button className="pulse btn waves-effect waves-light" onClick={props.showMoreTvTrends}>SHOW MORE</button> :
                    props.genres === true ? <button className="pulse btn waves-effect waves-light" onClick={props.showMoreGenre}>SHOW MORE</button> : ''
                }
            </div>
        </div>
    )
}

const btnShowMore = {
    textAlign: "center"
}

export default Pagination
import React from 'react';
import Rating from 'react-rating';
import starYellow from "../assets/images/star_yellow.png";
import starGrey from "../assets/images/star_grey.png";
import { css } from 'glamor';
import ReactTooltip from 'react-tooltip';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class Movie extends React.Component {
    state = {
        isFavorite: false,
    }
    
    render () {
        const {addToFavorites, removeFromFavorites, viewMovieInfo, movieId, onStarClick, vote, image, title, titleTv, date, dateTv, favoritesId, votesId} = this.props
    return (
        <div className={`col s12 m3 l4 xl3 container ${ml}`}>
            <div className="card hoverable">
                {
                    favoritesId.includes(movieId) ?
                        <div className="like" style={like} onClick={() => {
                            this.setState({isFavorite: false}, removeFromFavorites(movieId))}
                        }>
                            <div className={`${heart}`}>
                            <i className="fas fa-heart" style={removeIcon}></i>
                            </div>
                        </div> :
                        <div className="like" style={like} onClick={() => {
                            this.setState({isFavorite: true}, addToFavorites(movieId))}
                        }>
                            <div className={`${heart}`}>
                            <i className="far fa-heart" style={addIcon}></i>
                            </div>
                        </div>
                }
                <div className="card-image waves-effect waves-block waves-light">
                    {
                        image == null ? <img src={`https://mmix.3dn.ru/no-poster.jpg`} alt={title} className={`${poster}`} /> : <img src={`http://image.tmdb.org/t/p/w185${image}`} alt={title} className={`${poster}`} />
                    }
                </div>
                <div className="card-content" style={{paddingRight: "5px"}}>
                    {
                        title == null ? <p data-tip={titleTv} className={`${movieTitle}`}>{titleTv}</p> : <p data-tip={title} className={`${movieTitle}`}>{title}</p>
                    }
                    {
                        date == null ? <p style={movieDate}>Year: {dateTv.substring(0,4)}</p> : <p style={movieDate}>Year: {date.substring(0,4)}</p>
                    }
                    <ReactTooltip place="bottom" type="dark" effect="solid" />
                    <div className={`${rating}`}>
                    {votesId.includes(movieId) ?
                    <Rating
                    emptySymbol={<img alt="" src={starGrey} width="18px" height="18px" className="icon" />}
                    fullSymbol={<img alt="" src={starYellow} width="18px" height="18px" className="icon" />}
                    placeholderSymbol={<img alt="" src={starGrey} width="18px" height="18px" className="icon" />}
                    placeholderRating={vote}
                    start={0}
                    stop={10}
                    fractions={2}
                    readonly={true}
                    initialRating={vote}
                    /> :
                    <Rating
                    emptySymbol={<img alt="" src={starGrey} width="18px" height="18px" className="icon" />}
                    fullSymbol={<img alt="" src={starYellow} width="18px" height="18px" className="icon" />}
                    placeholderSymbol={<img alt="" src={starGrey} width="18px" height="18px" className="icon" />}
                    placeholderRating={vote}
                    start={0}
                    stop={10}
                    fractions={2}
                    onChange={() => onStarClick(movieId)}
                    initialRating={vote}
                    />}
                    </div>
                    <button className="waves-effect waves-light btn" style={{marginTop: "15px"}} onClick={() => viewMovieInfo(movieId)}>View Details</button>
                </div>
            </div>
        </div>
    )
}}

let rating = css({
    '@media(min-width: 700px)': {
      marginLeft: '-10px'
    }
})

let poster = css({
    width: '100%',
    height: '300px',
    '@media(max-width: 1200px)': {
      height: '350px'
    },
    '@media(max-width: 700px)': {
      width: '80% !important',
      margin: '0 auto'
    },
    '@media(max-width: 550px)': {
      height: '280px'
    },
    '@media(max-width: 500px)': {
      height: 'auto'
    }
  })

let ml = css({
'@media(max-width: 885px)': {
    width: "33.3333333333% !important",
    marginLeft: "auto !important",
    left: "auto !important",
    right: "auto !important"
},
'@media(max-width: 700px)': {
    width: "50% !important",
    marginLeft: "auto !important",
    left: "auto !important",
    right: "auto !important"
},
'@media(max-width: 500px)': {
    width: "100% !important",
    marginLeft: "auto !important",
    left: "auto !important",
    right: "auto !important"
}

})

let movieTitle = css({
    '@media(max-width: 500px)': {
        fontSize: "20px",
        fontWeight: "bold",
        overflow: "hidden",
        cursor: "pointer"
    },
    '@media(min-width: 500px)': {
        fontSize: "20px",
        fontWeight: "bold",
        overflow: "hidden",
        cursor: "pointer",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
    }

})


const movieDate = {
    fontSize: "20px",
    marginBottom: "10px"
}

const like = {
    position: "absolute",
    bottom: "25px",
    right: "25px",
    cursor: "pointer",
    transition: ".3s"
}
let heart =css({
    bottom: "0",
    right: "0",
    transition: '.3s',
    ':hover': {
        transform: 'scale(1.2)'
      },
})
const addIcon = {
    fontSize: "25px",
}
const removeIcon = {
    fontSize: "25px",
    color: "red"
}

export default Movie


// class Movie extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             isFavorite: false,
//             addToFavorites: props.addToFavorites,
//             removeFromFavorites: props.removeFromFavorites,
//             viewMovieInfo: props.viewMovieInfo,
//             movieId: props.movieId,
//             onStarClick: props.onStarClick,
//             vote: props.vote,
//             image: props.image,
//             title: props.title,
//             titleTv: props.titleTv,
//             date: props.date,
//             dateTv: props.dateTv
//         }
//     }
//     render() {
//     return (
//         <div className="col s12 m6 l3 container">
//             <div className="card">
//                 {/* {this.state.isFavorite ? 
//                 <div className="like" style={like} onClick={() => {
//                     this.setState({
//                         isFavorite: false
//                     })
//                     this.state.removeFromFavorites(this.state.movieId)}
//                 }>
//                     <div className="heart" style={heart}>
//                     <i className="fas fa-heart" style={removeIcon}></i>
//                     </div>
//                 </div> : 
//                 <div className="like" style={like} onClick={() => {
//                     this.setState({
//                         isFavorite: true
//                     })
//                     this.state.addToFavorites(this.state.movieId)}
//                 }>
//                     <div className="heart" style={heart}>
//                     <i className="far fa-heart" style={addIcon}></i>
//                     </div>
//                 </div>} */}
//                 <div className="card-image waves-effect waves-block waves-light">
//                     {
//                         this.state.image == null ? <img src={`https://mmix.3dn.ru/no-poster.jpg`} alt={this.state.title} style={{width: "100%", height: 300}} /> : <img src={`http://image.tmdb.org/t/p/w185${this.state.image}`} alt={this.state.title} style={{width: "100%", height: 300}} />
//                     }
//                 </div>
//                 <div className="card-content" style={{paddingRight: "10px"}}>
//                     {
//                         this.state.title == null ? <p style={movieTitle}>{this.state.titleTv}</p> : <p style={movieTitle}>{this.state.title}</p>
//                     }
//                     {
//                         this.state.date == null ? <p style={movieDate}>Year: {this.state.dateTv.substring(0,4)}</p> : <p style={movieDate}>Year: {this.state.date.substring(0,4)}</p>
//                     }
//                     <p>
//                     <Rating
//                     emptySymbol={<img alt="" src={starGrey} width="18px" height="18px" className="icon" />}
//                     fullSymbol={<img alt="" src={starYellow} width="18px" height="18px" className="icon" />}
//                     placeholderSymbol={<img alt="" src={starGrey} width="18px" height="18px" className="icon" />}
//                     placeholderRating={this.state.vote}
//                     start={0}
//                     stop={10}
//                     fractions={2}
//                     onChange={this.state.onStarClick}
//                     initialRating={this.state.vote}
//                     />
//                     </p>
//                     <button className="waves-effect waves-light btn" style={{marginTop: "15px"}} onClick={() => this.state.viewMovieInfo(this.state.movieId)}>View Details</button>
//                 </div>
//             </div>
//         </div>
//     )
// }}
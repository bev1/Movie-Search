import React from 'react';
import Nav from './Nav';
import SearchArea from './SearchArea';
import MovieList from './MovieList';
import Pagination from './Pagination';
import Menu from './Menu';
import MovieInfo from './MovieInfo';
import SideBar from './SideBar'
import { css } from 'glamor';
import { slide as MenuSlide } from 'react-burger-menu';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import Loader from 'react-spinners-loading/dist/index';

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      movies: [],
      favorites: [],
      favoritesId: [],
      votes: [],
      votesId: [],
      voteModal: false,
      moviesLength: 0,
      searchTerm: '',
      totalResults: 0,
      currentPage: 1,
      menuOpen: false,
      isModal: false,
      currentMovie: null,
      search: false,
      topMovie: false,
      topTv: false,
      trendMovie: false,
      trendTv: false,
      genres: false,
      isHidden: true,
      favorit: false,
      genreId: 0,
      valRatingFrom: 0,
      valRatingTo: 10,
      valYearFrom: 1900,
      valYearTo: 2020,
      stars: 0,
      isLoading: false
    }
    this.apiKey = '72815cb00c2b960b2e7ba6e17ffa823f';
  }

  componentDidMount() {
    this.getTopMovies()
  }

  filterRatingOn = (value) => {
    this.setState({movies: [],
      valRatingFrom: value[0],
      valRatingTo: value[1]
      },() => {
        (this.state.topMovie === true) ? this.getTopMovies() :
        (this.state.topTv === true) ? this.getTopTvShows() :
        (this.state.trendMovie === true) ? this.getMovieTrends() :
        (this.state.trendTv === true) ? this.getTvShowTrends() :
        (this.state.genres === true) ? this.filterGenre() : console.log("conditions failed")
      })
  }
  filterYearOn = (value) => {
    this.setState({movies: [],
      valYearFrom: value[0], 
      valYearTo: value[1]
      },() => {
        (this.state.topMovie === true) ? this.getTopMovies() :
        (this.state.topTv === true) ? this.getTopTvShows() :
        (this.state.trendMovie === true) ? this.getMovieTrends() :
        (this.state.trendTv === true) ? this.getTvShowTrends() :
        (this.state.genres === true) ? this.filterGenre() : console.log("conditions failed")
      })
  }

  onStarClick = (id) => {
    const votedMovies = [...this.state.votes]
    const filteredMovie = this.state.movies.filter(movie => movie.id === id)
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null
    votedMovies.push(newCurrentMovie)
    this.state.votesId.push(id)
    this.setState({voteModal: true})
  }

  closeVoteModal = () => {
    this.setState({voteModal: false})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({isLoading: true})

    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results], 
        totalResults: data.total_results,
        currentPage: 1,
        topMovie: false,
        topTv: false,
        trendMovie: false,
        trendTv: false,
        search: true,
        favorit: false,
        genres: false,
        isLoading: false
       }, () => {
        this.closeMenu ();
      })
    })
  }

  showMoreSearch = () => {
    this.setState({isLoading: true})
    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${this.apiKey}&query=${this.state.searchTerm}&page=${this.state.currentPage+1}`)
    .then(data => data.json())
    .then(data => {
      let moreItems = this.state.movies.concat([...data.results]);
      this.setState({ movies: moreItems, currentPage: this.state.currentPage+1, moviesLength: this.state.movies.length, isLoading: false })
    })
  }

  handleChange = (e) => {
    this.setState({ searchTerm: e.target.value })
  }

  getTopMovies = () => {
    this.setState({isLoading: true})
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=2000&include_adult=false&include_video=false&page=1&vote_average.gte=${this.state.valRatingFrom}&vote_average.lte=${this.state.valRatingTo}&primary_release_date.gte=${this.state.valYearFrom}-01-01&primary_release_date.lte=${this.state.valYearTo}-01-01`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results],
        totalResults: data.total_results,
        currentPage: 2,
        currentMovie: null,
        search: false,
        topTv: false,
        trendMovie: false,
        trendTv: false,
        topMovie: true,
        favorit: false,
        genres: false,
        isLoading: false
       }, () => {
        this.closeMenu ();
      })
    })
  }

  showMoreTopMovies = () => {
    this.setState({isLoading: true})
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=vote_average.desc&vote_count.gte=1000&include_adult=false&include_video=false&page=1&vote_average.gte=${this.state.valRatingFrom}&vote_average.lte=${this.state.valRatingTo}&primary_release_date.gte=${this.state.valYearFrom}-01-01&primary_release_date.lte=${this.state.valYearTo}-01-01&page=${this.state.currentPage+1}`)
    .then(data => data.json())
    .then(data => {
      let moreItems = this.state.movies.concat([...data.results])
      this.setState({ movies: moreItems, currentPage: this.state.currentPage+1, moviesLength: this.state.movies.length, isLoading: false })
    })
  }

  getTopTvShows = () => {
    this.setState({isLoading: true})

    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}&language=en-US&sort_by=vote_average.desc&first_air_date.gte=${this.state.valYearFrom}-01-01&first_air_date.lte=${this.state.valYearTo}-01-01&page=1&timezone=America%2FNew_York&vote_average.gte=${this.state.valRatingFrom}&vote_average.lte=${this.state.valRatingTo}&vote_count.gte=100&include_null_first_air_dates=false`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results],
        totalResults: data.total_results,
        currentPage: 1,
        currentMovie: null,
        search: false,
        topMovie: false,
        trendMovie: false,
        trendTv: false,
        topTv: true,
        favorit: false,
        genres: false,
        isLoading: false
       }, () => {
        this.closeMenu ();
      })
    })
  }

  showMoreTopTv = () => {
    this.setState({isLoading: true})
    fetch(`https://api.themoviedb.org/3/discover/tv?api_key=${this.apiKey}&language=en-US&sort_by=vote_average.desc&first_air_date.gte=${this.state.valYearFrom}-01-01&first_air_date.lte=${this.state.valYearTo}&page=${this.state.currentPage+1}&timezone=America%2FNew_York&vote_average.gte=${this.state.valRatingFrom}&vote_average.lte=${this.state.valRatingTo}&vote_count.gte=100&include_null_first_air_dates=false`)
    .then(data => data.json())
    .then(data => {
      let moreItems = this.state.movies.concat([...data.results]);
      this.setState({ movies: moreItems, currentPage: this.state.currentPage+1, moviesLength: this.state.movies.length, isLoading: false })
    })
  }

  getMovieTrends = () => {
    this.setState({isLoading: true})

    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}&page=1`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results],
        totalResults: data.total_results,
        currentPage: 1,
        currentMovie: null,
        search: false,
        topMovie: false,
        topTv: false,
        trendTv: false,
        trendMovie: true,
        favorit: false,
        genres: false,
        isLoading: false
      }, () => {
        this.closeMenu ();
      })
    })
  }

  showMoreMovieTrends = () => {
    this.setState({isLoading: true})
    fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${this.apiKey}&page=${this.state.currentPage+1}`)
    .then(data => data.json())
    .then(data => {
      let moreItems = this.state.movies.concat([...data.results]);
      this.setState({ movies: moreItems, currentPage: this.state.currentPage+1, moviesLength: this.state.movies.length, isLoading: false })
    })
  }

  getTvShowTrends = () => {
    this.setState({isLoading: true})

    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${this.apiKey}&page=1`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results],
        totalResults: data.total_results,
        currentPage: 1,
        currentMovie: null,
        search: false,
        topMovie: false,
        topTv: false,
        trendMovie: false,
        trendTv: true,
        favorit: false,
        genres: false,
        isLoading: false
      }, () => {
        this.closeMenu ();
      })
    })
  }

  showMoreTvTrends = () => {
    this.setState({isLoading: true})
    fetch(`https://api.themoviedb.org/3/trending/tv/week?api_key=${this.apiKey}&page=${this.state.currentPage+1}`)
    .then(data => data.json())
    .then(data => {
      let moreItems = this.state.movies.concat([...data.results]);
      this.setState({ movies: moreItems, currentPage: this.state.currentPage+1, moviesLength: this.state.movies.length, isLoading: false })
    })
  }

  getGenre = (e) => { 
    e.preventDefault();
    this.setState({isLoading: true})
    this.setState({genreId: e.target.getAttribute('id')}, () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=500&vote_average.gte=${this.state.valRatingFrom}&vote_average.lte=${this.state.valRatingTo}&primary_release_date.gte=${this.state.valYearFrom}-01-01&primary_release_date.lte=${this.state.valYearTo}-01-01&with_genres=${this.state.genreId}`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results],
        totalResults: data.total_results,
        currentPage: 1,
        currentMovie: null,
        search: false,
        topTv: false,
        trendMovie: false,
        trendTv: false,
        topMovie: false,
        favorit: false,
        genres: true,
        isLoading: false
       }, () => {
        this.closeMenu ();
      })
    })})
  }

  filterGenre = () => {
    this.setState({isLoading: true})
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=500&vote_average.gte=${this.state.valRatingFrom}&vote_average.lte=${this.state.valRatingTo}&primary_release_date.gte=${this.state.valYearFrom}-01-01&primary_release_date.lte=${this.state.valYearTo}-01-01&with_genres=${this.state.genreId}`)
    .then(data => data.json())
    .then(data => {
      this.setState({ movies: [...data.results],
        totalResults: data.total_results,
        currentPage: 1,
        currentMovie: null,
        search: false,
        topTv: false,
        trendMovie: false,
        trendTv: false,
        topMovie: false,
        favorit: false,
        genres: true,
        isLoading: false
       }, () => {
        this.closeMenu ();
      })
    })
  }

  showMoreGenre = () => {
    this.setState({isLoading: true})
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${this.apiKey}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=500&vote_average.gte=${this.state.valRatingFrom}&vote_average.lte=${this.state.valRatingTo}&primary_release_date.gte=${this.state.valYearFrom}-01-01&primary_release_date.lte=${this.state.valYearTo}-01-01&with_genres=${this.state.genreId}&page=${this.state.currentPage+1}`)
    .then(data => data.json())
    .then(data => {
      let moreItems = this.state.movies.concat([...data.results]);
      this.setState({ movies: moreItems, currentPage: this.state.currentPage+1, moviesLength: this.state.movies.length, isLoading: false })
    })
  }

  getFavorites = () => {
    this.setState({
      movies: this.state.favorites,
      search: false,
      topTv: false,
      trendMovie: false,
      trendTv: false,
      topMovie: false,
      favorit: true,
      genres: false
    }, () => {
      this.closeMenu ();
    })
  }

  viewMovieInfo = (id) => {
    const filteredMovie = this.state.movies.filter(movie => movie.id === id)
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null
    this.setState({ currentMovie: newCurrentMovie, isModal: true })
  }

  addToFavorites = (id) => {
    const favoriteMovies = [...this.state.favorites]
    const filteredMovie = this.state.movies.filter(movie => movie.id === id)
    const newCurrentMovie = filteredMovie.length > 0 ? filteredMovie[0] : null
    favoriteMovies.push(newCurrentMovie)
    this.state.favoritesId.push(id)
    this.setState({
      favorites: favoriteMovies
    })
  }

  removeFromFavorites = (id) => {
    const favoriteMovies = [...this.state.favorites]
    const filteredMovies = favoriteMovies.filter(movie => movie.id !== id)
    this.setState({
      favorites: filteredMovies
    })
    const ids = [...this.state.favoritesId]
    const newIds = ids.filter(item => item !== id)
    this.setState({favoritesId: newIds})
  }

  closeMovieInfo = () => {
    this.setState({ currentMovie: null, isModal: false })
  }

  handleStateChange (state) {
    this.setState({menuOpen: state.isOpen})  
  }

  closeMenu () {
    this.setState({menuOpen: false})
  }

  render() {

    return (
      <div className="App">
        <MenuSlide styles={menuSlide} burgerButtonClassName={`${menuMobile}`} isOpen={this.state.menuOpen} onStateChange={(state) => this.handleStateChange(state)}>
        <SideBar search={this.state.search} favorit={this.state.favorit} trendTv={this.state.trendTv} trendMovie={this.state.trendMovie} valRatingFrom={this.state.valRatingFrom} valRatingTo={this.state.valRatingTo} valYearFrom={this.state.valYearFrom} valYearTo={this.state.valYearTo} filterRatingOn={this.filterRatingOn} filterYearOn={this.filterYearOn} getGenre={this.getGenre} getTopMovies={this.getTopMovies} getTopTvShows={this.getTopTvShows} getMovieTrends={this.getMovieTrends} getTvShowTrends={this.getTvShowTrends} getFavorites={this.getFavorites} />
        </MenuSlide>
        <Nav getTopMovies={this.getTopMovies} getTopTvShows={this.getTopTvShows} getMovieTrends={this.getMovieTrends} getTvShowTrends={this.getTvShowTrends} getFavorites={this.getFavorites} />
        <div className="row">
          <div className="col l3">
            <Menu search={this.state.search} favorit={this.state.favorit} trendTv={this.state.trendTv} trendMovie={this.state.trendMovie} valRatingFrom={this.state.valRatingFrom} valRatingTo={this.state.valRatingTo} valYearFrom={this.state.valYearFrom} valYearTo={this.state.valYearTo} filterRatingOn={this.filterRatingOn} filterYearOn={this.filterYearOn} getGenre={this.getGenre} />
          </div>
          <div className="col s12 l9">
          <div>
            <SearchArea searchTerm={this.state.searchTerm} handleSubmit={this.handleSubmit} handleChange={this.handleChange}/>
            {this.state.movies.length === 0 ? <div className={`${emptyPage}`}>Oops... nothing to show here</div> : <MovieList votesId={this.state.votesId} favoritesId={this.state.favoritesId} favorites={this.state.favorites} isFavorite={this.state.isFavorite} addToFavorites={this.addToFavorites} removeFromFavorites={this.removeFromFavorites} viewMovieInfo={this.viewMovieInfo} movies={this.state.movies} onStarClick={this.onStarClick} valRatingFrom={this.state.valRatingFrom} valRatingTo={this.state.valRatingTo}/>}
          </div>
          {this.state.isModal === true ? <MovieInfo currentMovie={this.state.currentMovie} closeMovieInfo={this.closeMovieInfo} />: ''}
          {this.state.voteModal === true ? 
            <div className={`${voteWrap}`}>
            <div className={`${voteModal}`}>
            Thanks for your vote <br/>
            <button className="waves-effect waves-light btn" style={{marginTop: '25px'}} onClick={this.closeVoteModal}>Close</button>
            </div>
            </div>: ''}
          {this.state.totalResults > 20 && this.state.currentMovie === null && this.state.totalResults > this.state.moviesLength+20 ? <Pagination search={this.state.search} genres={this.state.genres} topMovie={this.state.topMovie} topTv={this.state.topTv} trendMovie={this.state.trendMovie} trendTv={this.state.trendTv} showMoreSearch={this.showMoreSearch} showMoreTopMovies={this.showMoreTopMovies} showMoreTopTv={this.showMoreTopTv} showMoreMovieTrends={this.showMoreMovieTrends} showMoreTvTrends={this.showMoreTvTrends} showMoreGenre={this.showMoreGenre} /> : ''}
          </div>
        </div>
        {this.state.isLoading === true ? 
            <div className={`${voteWrap}`}>
              <Loader
                width="100%"
                height="100%"
                color="#FFF"
              /> 
              </div>: '' 
              }
      </div>
    );
  }
}

let voteWrap = css({
  position: "fixed",
  zIndex: "9999",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  overflow: "auto",
  background: "rgba(0, 0, 0, 0.6)"
})

let voteModal = css({
  padding: '25px 100px',
  fontSize: '25px',
  textAlign: 'center',
  fontFamily: "'Acme'",
  background: 'white',
  borderRadius: '5px',
  position: 'absolute',
  zIndex: '9999',
  top: "50%",
  left: "50%",
  marginRight: '-50%',
  transform: 'translate(-50%, -50%)',
  '@media(max-width: 600px)': {
    fontSize: '20px',
    padding: '25px 50px',
  }

})

let menuMobile = css({
  '@media(min-width: 992px)': {
    display: 'none'
  }
})

let emptyPage = css({
  marginTop: '50px',
  fontFamily: "'Acme'",
  fontSize: '25px',
  textAlign: 'center',
  color: 'rgba(0,0,0,.3)'
})

const menuSlide = {
  bmBurgerButton: {
    position: 'fixed',
    width: '30px',
    height: '25px',
    right: '25px',
    top: '15px'
  },
  bmBurgerBars: {
    background: 'white'
  },
  bmBurgerBarsHover: {
    background: '#a90000'
  },
  bmCrossButton: {
    height: '24px',
    width: '24px'
  },
  bmCross: {
    background: '#bdc3c7'
  },
  bmMenuWrap: {
    position: 'fixed',
    height: '100%'
  },
  bmMenu: {
    background: '#EE6E73',
    fontSize: '1.15em'
  },
  bmMorphShape: {
    fill: '#373a47'
  },
  bmItemList: {
    color: '#b8b7ad',
  },
  bmItem: {
    display: 'inline-block'
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)'
  }
}

export default App;
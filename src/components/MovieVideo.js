import React from 'react';
import YouTube from 'react-youtube';
import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

class MovieVideo extends React.Component {
constructor(props) {
    super(props)
    this.state = {
      searchMovie: props.movieTitle + ' trailer',
      searchTv: props.TvTitle + ' trailer',
      trailerId: ''      
    }
    }

    componentDidMount () {
      this.props.movieTitle === undefined ? 
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${this.state.searchTv}&key=AIzaSyBsytiqJN3OYStSuenLDCfvneZ1pzvZflI`)
        .then(data => data.json())
        .then(data => {
          this.setState({ trailerId: data.items[0].id.videoId })
        }) :
        fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${this.state.searchMovie}&key=AIzaSyBsytiqJN3OYStSuenLDCfvneZ1pzvZflI`)
        .then(data => data.json())
        .then(data => {
          this.setState({ trailerId: data.items[0].id.videoId })
        })

      }

    render() {
      const opts = {
        height: '390',
        width: '640',
      };
        return (
          <div className="video-container">
          <YouTube
            videoId={this.state.trailerId}
            opts={opts}
          />
          </div>
        )
    }
}

export default MovieVideo
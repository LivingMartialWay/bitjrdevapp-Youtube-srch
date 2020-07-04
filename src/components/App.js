import React from 'react';
import SearchBar from '@bit/livingmartialway.bitjrdevapp.search-bar';
import youtube from '../apis/youtube';
import VideoList from './VideoList';
import VideoDetail from './VideoDetail';
import './app.css';

const KEY = 'AIzaSyAp1CcZzLi66lg_uKb_We8qPOq0lcXWnQ4';

class App extends React.Component {
  state = { videos: [], selectedVideo: null };

  componentDidMount() {
    this.onTermSubmit('Software developer SALARIES are higher than you think');
  }

  onTermSubmit =  async term => {
    const response = await youtube.get('/search', {
      params: {
        q: term,
        part: 'snippet',
        type: 'video',
        maxResults: 5,
        key: KEY
      }
    })

    this.setState({
      videos : response.data.items,
      selectedVideo: response.data.items[0]
    });
  };

  onVideoSelect = video => {
    this.setState({ selectedVideo: video });
  }

  render() {
    return (
      <div className="ui container">
        <legend className="sblegend">bit.dev/livingmartialway/bitjrdevapp/search-bar
          <SearchBar onFormSubmit={this.onTermSubmit} />
            <legend className="logolegend">bitjrdevapp/logo</legend>
        </legend>
        <div className="ui grid">
          <div className="ui row">
            <div className="eleven wide column">
              <VideoDetail video={this.state.selectedVideo} />
            </div>
            <div className="five wide column">
              <VideoList
                onVideoSelect={this.onVideoSelect}
                videos={this.state.videos}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

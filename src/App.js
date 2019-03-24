import React, { Component } from 'react';
import Map from './components/Map';
import MapGL from './components/MapGL';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MapGL />
      </div>
    );
  }
}

export default App;

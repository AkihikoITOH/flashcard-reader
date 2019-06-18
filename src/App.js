import React from 'react';
import Header from './Header';

class App extends React.Component {
  render() {
    return (
      <div>
      <div className="ui container" style={{ marginTop: '10px' }}>
        <Header/>
        <div className="ui hidden divider"></div>
        {this.props.children}
      </div>
      </div>
    );
  };
}

export default App;

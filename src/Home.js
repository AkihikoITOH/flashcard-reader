import React from 'react';
import App from './App';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor(props) {
    super(props);

    const text = localStorage.getItem('text');
    this.state = {
      text: text ? text : ''
    };
  }

  onTextChanged(event) {
    localStorage.setItem('text', event.target.value);
    this.setState({ text: event.target.value });
  }

  onClearText(event) {
    localStorage.setItem('text', '');
    this.setState({ text: '' });
  }

  startReadingButton() {
    return (
      <Link to="/reader" className="ui right labeled icon button positive">
        Start reading
        <i className="right arrow icon"></i>
      </Link>
    )
  }

  content() {
    return (
      <div className="ui form">
        <div className="field">
          <label>Text</label>
          <textarea placeholder="Paste a text here." value={this.state.text} onChange={e => this.onTextChanged(e)}></textarea>
        </div>
        <button className="ui basic button negative" onClick={e => this.onClearText(e)}>
          Clear text
        </button>
        {this.state.text.length > 0 ? this.startReadingButton() : '' }
      </div>
    )
  }

  render() {
    return (
      <App>
        {this.content()}
      </App>
    )
  }
}

export default Home;

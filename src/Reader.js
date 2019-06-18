import React from 'react';
import App from './App';
import Word from './Word';
import nlp from 'compromise';
import uuidv1 from 'uuid/v1';
import { Progress, Form } from 'semantic-ui-react'

class Reader extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: localStorage.getItem('text'),
      terms: null,
      playing: false,
      frequency: 300, // Words per minute
      currentIndex: 0,
      wordID: uuidv1()
    };
  }

  skipToBeginning() {
    this.setState({ playing: false, currentIndex: 0 });
    this.refreshWordID()
  }

  skipToEnd() {
    this.setState({ playing: false, currentIndex: this.state.terms.length - 1 });
    this.refreshWordID()
  }

  shiftForward() {
    return () => {
      if (this.state.currentIndex < this.state.terms.length - 1) {
        const newIndex = this.state.currentIndex + 1
        this.setState({ currentIndex: newIndex });
      } else {
        this.setState({ playing: false });
      }
      this.refreshWordID()
    }
  }

  shiftBackward() {
    return () => {
      if (this.state.currentIndex > 0) {
        const newIndex = this.state.currentIndex - 1
        this.setState({ currentIndex: newIndex });
      } else {
        this.setState({ playing: false });
      }
      this.refreshWordID()
    }
  }

  refreshWordID() {
    this.setState({ wordID: uuidv1() })
  }

  togglePlaying() {
    this.setState({ playing: !this.state.playing })
    this.refreshWordID()
  }

  onFrequencyChange(event) {
    this.setState({ frequency: event.target.value });
  }

  loading() {
    return (
      <i className="notched circle loading icon"></i>
    )
  }

  progress() {
    return Math.round(100 * (this.state.currentIndex + 1) / this.state.terms.length)
  }

  progressBar() {
    return (
      <Progress percent={this.progress()} size='tiny' success>{this.progress()}%</Progress>
    )
  }

  reader() {
    return (
      <Word key={this.state.wordID}
            word={this.state.terms[this.state.currentIndex]}
            playing={this.state.playing}
            interval={1000 * 60 / this.state.frequency}
            shiftIndex={this.shiftForward()}
      />
    )
  }

  buttons() {
    return (
      <div className="column row">
        <div className="ui icon button" onClick={() => this.skipToBeginning()}><i className="step backward icon"></i></div>
        <div className="ui icon button" onClick={() => this.shiftBackward()()}><i className="angle left icon"></i></div>
        <div className="ui icon button" onClick={() => this.togglePlaying()}>
          <i className={`${this.state.playing ? "pause" : "play"} icon`}></i>
        </div>
        <div className="ui icon button" onClick={() => this.shiftForward()()}><i className="angle right icon"></i></div>
        <div className="ui icon button" onClick={() => this.skipToEnd()}><i className="step forward icon"></i></div>
      </div>
    )
  }

  componentDidMount() {
    const terms = nlp(this.state.text).terms().data().map(term => term.text);
    this.setState({ terms: terms, progress: Math.round(100 / terms.length) });
  }

  content() {
    return (
      <div className="ui three column centered grid">
        <div className="column row">
          {this.state.terms == null ? this.loading() : this.reader()}
        </div>
        <div className="column">
          {this.state.terms == null ? '' : this.progressBar()}
        </div>
        {this.buttons()}
        <div className="ui hidden divider"></div>
        <div className="column row ui form">
          <Form.Input
            label={`Word frequency: ${this.state.frequency} [word/minute]`}
            type="range"
            name="frequency"
            min="10"
            max="1200"
            onChange={(e) => this.onFrequencyChange(e)}
            step={10}
            value={this.state.frequency}
            />
        </div>
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

export default Reader;

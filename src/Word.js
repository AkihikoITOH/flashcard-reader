import React from 'react';

class Word extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      word: props.word,
      shiftIndex: props.shiftIndex,
      interval: props.interval,
      playing: props.playing
    };
  }

  componentDidMount() {
    const that = this;
    if (this.state.playing) {
      this.timeout = setTimeout(() => that.state.shiftIndex(), this.state.interval);
    }
  }

  componentDidUpdate() {
    const that = this;
    if (this.state.playing) {
      this.timeout = setTimeout(() => that.state.shiftIndex(), this.state.interval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timeout);
  }

  render() {
    return (
      <div className="ui massive message">
        {this.state.word}
      </div>
    )
  }
}

export default Word;

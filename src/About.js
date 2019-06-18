import React from 'react';
import App from './App';

class About extends React.Component {
  render() {
    return (
      <App>
        <p>
          This is a "flashcard" style text reader, implemented based on a hypothesis that it makes reading texts easier and more efficient.
          <br/>
          It was inspired by <a href="https://twitter.com/inaniwa3/status/1138427948606693378">a tweet from @inaniwa3</a>.
          <br/>
          It currently works with English and probably other languages in which words are separated by spaces but not with other languages such as Japanese or Chinese.
          <br/>
          If you have suggestion, question or anything else you want to say, please contact me via <a href="mailto:contact@akihiko.eu">email</a>.
          You can also create an issue or a pull request on <a href="https://github.com/AkihikoITOH/flashcard-reader">Github</a>.
        </p>
      </App>
    )
  }
}

export default About;

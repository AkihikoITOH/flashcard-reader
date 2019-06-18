import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <div className="ui secondary  menu">
        <Link to='/' className="active item">
          Home
        </Link>
        <Link to='/about' className="item">
          What's this?
        </Link>
      </div>
    )
  }
}

export default Header;

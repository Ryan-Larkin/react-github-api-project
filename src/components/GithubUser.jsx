import React from 'react';
import {Link} from 'react-router';

class GithubUser extends React.Component {
  render() {
    return (
      <Link to={`/user/${this.props.user.login}`} className="followers-item">
        <img className="user-img" src={this.props.user.avatar_url} alt="" />
        {this.props.user.login}
      </Link>
    );
  }
}

export default GithubUser;

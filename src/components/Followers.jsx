import React from 'react';
import GithubUser from './GithubUser';

class Followers extends React.Component {
  constructor() {
      super();
      this.state = {};
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.props.params.username}/followers`)
    .then(data => data.json())
    .then(followerData => {
      this.setState({
        followers: followerData
      });
    });
  }

  renderFollowerList(follower) {
    return (<li key={follower.id} className="followers-list-item"><GithubUser user={follower} /></li>);
  }

  render() {
    if (!this.state.followers) {
      return <div>LOADING FOLLOWERS...</div>;
    }

    return (
      <div className="followers-page">
        <h3>Followers of {this.props.params.username}</h3>
        <ul className="followers-list follow-list">
          {this.state.followers.map(this.renderFollowerList)}
        </ul>
      </div>
    );
  }
}

export default Followers;

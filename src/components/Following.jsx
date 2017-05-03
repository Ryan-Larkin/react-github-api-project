import React from 'react';
import GithubUser from './GithubUser';

class Following extends React.Component {
  constructor() {
      super();
      this.state = {};
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.props.params.username}/following`)
    .then(data => data.json())
    .then(followingData => {
      this.setState({
        following: followingData
      });
    });
  }

  renderFollowingList(following) {
    return (<li key={following.id} className="following-list-item"><GithubUser user={following} /></li>);
  }

  render() {
    if (!this.state.following) {
      return <div>LOADING USERS YOU ARE FOLLOWING...</div>;
    }

    return (
      <div className="following-page">
        <h3>{this.props.params.username} is following: </h3>
        <ul className="following-list follow-list">
          {this.state.following.map(this.renderFollowingList)}
        </ul>
      </div>
    );
  }
}

export default Following;

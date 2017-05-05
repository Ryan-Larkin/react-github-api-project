import React from 'react';
import GithubUser from './GithubUser';
import Infinite from 'react-infinite';

const GITHUB_API_KEY = '3768e8dd72d299453224875aed0c6a59274a1e46';

class Followers extends React.Component {
  constructor() {
      super();
      this.state = {
        page: 1,
        loading: false,
        followers: []
      };
  }

  fetchData = () => {
    this.setState({
      loading: true
    });

    fetch(`https://api.github.com/users/${this.props.params.username}/followers?access_token=${GITHUB_API_KEY}&page=${this.state.page}&per_page=50`)
    .then(data => data.json())
    .then(followerData => {
      this.setState({
        page: this.state.page + 1,
        loading: false,
        followers: this.state.followers.concat(followerData)
      });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  renderFollowerList(follower) {
    return (<GithubUser key={follower.id} user={follower} className="followers-item"/>);
  }

  render() {
    return (
      <div>
        <h3>Followers of {this.props.params.username}</h3>
        <Infinite className="followers-page" isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer elementHeight={40} infiniteLoadBeginEdgeOffset={100} loadingSpinnerDelegate={<div>LOADING...</div>}>
          {this.state.followers.map(this.renderFollowerList)}
        </Infinite>
      </div>
    );
  }
}

export default Followers;

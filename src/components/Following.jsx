import React from 'react';
import GithubUser from './GithubUser';
import Infinite from 'react-infinite';

const GITHUB_API_KEY = '3768e8dd72d299453224875aed0c6a59274a1e46';

class Following extends React.Component {
  constructor() {
      super();
      this.state = {
        page: 1,
        loading: false,
        following: []
      };
  }

  fetchData = () => {
    fetch(`https://api.github.com/users/${this.props.params.username}/following?access_token=${GITHUB_API_KEY}&page=${this.state.page}&per_page=50`)
    .then(data => data.json())
    .then(followingData => {
      this.setState({
        page: this.state.page + 1,
        loading: false,
        following: this.state.following.concat(followingData)
      });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  renderFollowingList(following) {
    return (<GithubUser key={following.id} user={following} className="following-item" />);
  }

  render() {
    return (
      <div>
        <h3>{this.props.params.username} is following: </h3>
        <Infinite className="following-page" isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer elementHeight={40} infiniteLoadBeginEdgeOffset={100} loadingSpinnerDelegate={<div>LOADING...</div>}>
          {this.state.following.map(this.renderFollowingList)}
        </Infinite>
      </div>
    );
  }
}

export default Following;

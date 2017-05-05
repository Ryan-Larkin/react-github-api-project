import React from 'react';
import GithubRepos from './GithubRepos';
import Infinite from 'react-infinite';

const GITHUB_API_KEY = '3768e8dd72d299453224875aed0c6a59274a1e46';

class Repos extends React.Component {
  constructor() {
      super();
      this.state = {
        page: 1,
        loading: false,
        repos: []
      };
  }

  fetchData = () => {
    this.setState({
      loading: true
    });

    fetch(`https://api.github.com/users/${this.props.params.username}/repos?access_token=${GITHUB_API_KEY}&page=${this.state.page}&per_page=50`)
    .then(data => data.json())
    .then(repoData => {
      this.setState({
        page: this.state.page + 1,
        loading: false,
        repos: this.state.repos.concat(repoData)
      });
    });
  }

  componentDidMount() {
    this.fetchData();
  }

  renderRepoList(repo) {
    return (<GithubRepos key={repo.id} repo={repo} className="repos-item" />);
  }

  render() {

    return (
      <div>
        <h3>{this.props.params.username}'s repos: </h3>
        <Infinite className="repos-page" isInfiniteLoading={this.state.loading} onInfiniteLoad={this.fetchData} useWindowAsScrollContainer elementHeight={20} infiniteLoadBeginEdgeOffset={100} loadingSpinnerDelegate={<div>LOADING...</div>}>
          {this.state.repos.map(this.renderRepoList)}
        </Infinite>
      </div>
    );
  }
}

export default Repos;

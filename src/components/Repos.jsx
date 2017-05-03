import React from 'react';
import GithubRepos from './GithubRepos';

class Repos extends React.Component {
  constructor() {
      super();
      this.state = {};
  }

  componentDidMount() {
    fetch(`https://api.github.com/users/${this.props.params.username}/repos`)
    .then(data => data.json())
    .then(repoData => {
      this.setState({
        repos: repoData
      });
    });
  }

  renderRepoList(repo) {
    return (<li key={repo.id} className="repos-list-item"><GithubRepos repo={repo} /></li>);
  }

  render() {
    if (!this.state.repos) {
      return <div>LOADING REPOS...</div>;
    }

    return (
      <div className="followers-page">
        <h3>{this.props.params.username}'s repos: </h3>
        <ul className="repos-list follow-list">
          {this.state.repos.map(this.renderRepoList)}
        </ul>
      </div>
    );
  }
}

export default Repos;

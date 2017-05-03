import React from 'react';

class GithubRepos extends React.Component {
  render() {
    return (
      <div className="repos-container">
        <a href={this.props.repo.html_url} className="repos-item">
          {this.props.repo.name}
        </a>
        <span className="stars-container">{this.props.repo.stargazers_count}  &#9733;</span>
      </div>
    );
  }
}

export default GithubRepos;

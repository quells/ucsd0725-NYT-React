import React, { Component } from "react";
import shortid from "shortid";
import { Link } from "react-router-dom";
import API from "../../utils/API";

import { Container } from "../../components/Grid";
import { List, ArticleListItem } from "../../components/List";

class Saved extends Component {
  state = {
    saved: null,
    lastDownload: Date.now()
  };

  getLatest() {
    API.getSavedArticles()
      .then(articles => this.setState({saved: articles.data, lastDownload: Date.now()}))
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.saved === null || Date.now() - this.state.lastDownload > 1000) this.getLatest();
    return (
      <Container>
        <hr />
        <div>
          <h2>
            <Link to="/saved">Saved Articles</Link>
          </h2>
          {this.state.saved && this.state.saved.length ?
            (
              <List>
              {this.state.saved.map(s => {
                let button = (
                  <Link className="btn btn-secondary" to={"/saved/" + s._id}>
                    Comments ({s.comments.length})
                  </Link>
                );
                return <ArticleListItem key={shortid()} article={s} button={button} />;
              })}
              </List>
            ) : (
              <h3>No Saved Articles</h3>
            )
          }
        </div>
      </Container>
    );
  }
}

export default Saved;

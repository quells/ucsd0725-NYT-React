import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import shortid from "shortid";
import API from "../../utils/API";

import { Container } from "../../components/Grid";
import { List, ListItem, ArticleListItem } from "../../components/List";
import { Form, Input, TextArea } from "../../components/Form";

class Detail extends Component {
  state = {
    id: this.props.match.params.id,
    lastDownload: Date.now(),
    article: null,
    commentUsername: "",
    commentBody: "",
    angry: false
  }

  getLatest() {
    API.getSavedArticle(this.state.id)
      .then(response => this.setState({article: response.data, lastDownload: Date.now()}))
      .catch(err => console.log(err));
  }

  handleInputChange = event => {
    let {name, value} = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmitComment = event => {
    event.preventDefault();
    if (this.state.commentBody.length < 1) {
      return this.setState({angry: true})
    }
    this.setState({angry: false})
    API.addComment(this.state)
      .then(() => {
        this.setState({commentBody: ""})
        this.getLatest()
      })
      .catch(err => console.log(err));
  }

  handleDeleteArticle = () => {
    API.deleteArticle(this.state.id)
      .then(() => this.setState({redirectToHome: true}))
      .catch(err => console.log(err));
  }

  handleDeleteComment = commentId => {
    API.deleteComment(commentId)
      .then(() => this.getLatest())
      .catch(err => console.log(err))
  }

  render() {
    if (this.state.redirectToHome) return <Redirect to="/" />;
    if (this.state.article === null || Date.now() - this.state.lastDownload > 1000) this.getLatest();
    if (this.state.article === null) return (
      <Container>
        <h2>Article Not Found</h2>
      </Container>
    );
    let deleteBtn = (
      <button className="btn btn-danger" onClick={this.handleDeleteArticle}>Delete</button>
    );
    return (
      <Container>
        <List>
          <ArticleListItem key={shortid()} article={this.state.article} button={deleteBtn} />
        </List>
        <br />
        <Form>
          <h3>Add a Comment</h3>
          <Input
            type="text"
            name="commentUsername"
            onChange={this.handleInputChange}
            value={this.state.commentUsername}
            placeholder="Username"
          />
          <TextArea
            name="commentBody"
            onChange={this.handleInputChange}
            value={this.state.commentBody}
            angry={String(this.state.angry)}
          />
          <div className="form-group text-right">
            <button className="btn btn-primary" onClick={this.handleSubmitComment}>Submit</button>
          </div>
        </Form>
        {
          (this.state.article.comments.length > 0) ? (
            <div>
              <hr />
              <List>
                {this.state.article.comments.map(c => (
                  <CommentListItem key={shortid()} comment={c} handleClick={() => this.handleDeleteComment(c._id)} />
                ))}
              </List>
            </div>
          ) : ""
        }
      </Container>
    );
  }
}

const CommentListItem = ({comment, handleClick}) => (
  <ListItem>
    <div className="text-right">
      <button className="btn btn-danger" onClick={handleClick}>&times;</button>
    </div>
    <p>{comment.user}: {comment.body}</p>
  </ListItem>
);

export default Detail;

import React, { Component } from "react";
import moment from "moment";
import shortid from "shortid";
import API from "../../utils/API";
import "./Search.css";

import { Container, Row, Col } from "../../components/Grid";
import { Form, Input, FormButton } from "../../components/Form";
import { List, ListItem } from "../../components/List";

let minYear = "1900";
let maxYear = moment().format("YYYY");

class Search extends Component {
  state = {
    searchTerm: "",
    minYear: minYear,
    maxYear: maxYear,
    startYear: minYear,
    endYear: maxYear,
    results: []
  };

  handleInputChange = event => {
    let {name, value} = event.target;
    let ssy = this.state.startYear;
    let sey = this.state.endYear;
    switch (name) {
      case "startYear":
        ssy = value;
        if (value > sey) sey = value;
        break;
      case "endYear":
        sey = value;
        if (value < ssy) ssy = value;
        break;
      default:
        break;
    }
    this.setState({
      [name]: value,
      "startYear": ssy,
      "endYear": sey
    });
  };

  handleSearch = event => {
    event.preventDefault();
    if (this.state.searchTerm.length < 1) return;
    if (parseInt(this.state.startYear, 10) === undefined) return;
    if (parseInt(this.state.startYear, 10) === undefined) return;

    API.getArticles(this.state)
      .then(response => this.setState({results: response.data}))
      .catch(err => console.error(err))
  };

  render() {
    // TODO: double range slider for year selection
    return (
      <Container>
        <hr />
        <Form inline>
          <Input
            type="text"
            name="searchTerm"
            placeholder="Search&hellip;"
            value={this.state.searchTerm}
            onChange={this.handleInputChange}
            addclasses="mb-2 mr-sm-2"
          />
          <Input
            type="number"
            name="startYear"
            min={this.state.minYear}
            max={this.state.maxYear}
            value={this.state.startYear}
            onChange={this.handleInputChange}
            addclasses="mb-2 mr-sm-2"
          />
          <Input
            type="number"
            name="endYear"
            min={this.state.minYear}
            max={this.state.maxYear}
            value={this.state.endYear}
            onChange={this.handleInputChange}
            addclasses="mb-2 mr-sm-2"
          />
          <FormButton addclasses="btn-primary mb-2" onClick={this.handleSearch}>
            Search
          </FormButton>
        </Form>
        <hr />
        <div>
          <Row>
            <Col size="9"><h2>Search Results</h2></Col>
            <Col size="3" addclasses="text-right">
               {this.state.results.length ?
                (
                  <button type="button" className="btn btn-danger" onClick={() => this.setState({results: []})}>
                    Clear
                  </button>
                ) : ""
              }
            </Col>
          </Row>

          {this.state.results.length ?
            (
              <List>
              {this.state.results.map(r => <ArticleListItem key={shortid()} article={r} />)}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )
          }
        </div>
      </Container>
    );
  }
}

class ArticleListItem extends Component {
  state = this.props.article;
  handleSave = this.handleSave.bind(this);

  handleSave() {
    API.saveArticle(this.state);
  }

  render() {
    return (
      <ListItem>
        <Row>
          <Col size="6 sm-4 md-3">
            <img src={this.state.image} className="article-image" alt={this.state.snippet} />
          </Col>
          <Col size="12 sm-8 md-9">
            <h3><a href={this.state.url} target="_blank">{this.state.headline}</a></h3>
            <h4>
              {this.state.author}
              <br />
              <small>
                <span className="text-muted">{moment(this.state.published).format("MMMM Do YYYY")}</span>
              </small>
            </h4>
            <p>{this.state.snippet}</p>
            <div className="text-right">
              <button className="btn btn-success" onClick={this.handleSave}>Save</button>
            </div>
          </Col>
        </Row>
      </ListItem>
    );
  }
}

export default Search;

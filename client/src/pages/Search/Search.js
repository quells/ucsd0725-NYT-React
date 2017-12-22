import React, { Component } from "react";
import moment from "moment";
import shortid from "shortid";
import { Redirect } from "react-router-dom";
import API from "../../utils/API";
import "./Search.css";

import { Container, Row, Col } from "../../components/Grid";
import { Form, Input, FormButton } from "../../components/Form";
import { List, ArticleListItem } from "../../components/List";

let minYear = "1900";
let maxYear = moment().format("YYYY");

class Search extends Component {
  state = {
    searchTerm: "",
    minYear: minYear,
    maxYear: maxYear,
    startYear: minYear,
    endYear: maxYear,
    oldestFirst: false,
    redirectToSaved: false,
    latestSaved: null,
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
    if (event !== undefined) event.preventDefault();
    if (this.state.searchTerm.length < 1) return;
    if (parseInt(this.state.startYear, 10) === undefined) return;
    if (parseInt(this.state.startYear, 10) === undefined) return;

    API.getArticles(this.state)
      .then(response => this.setState({results: response.data}))
      .catch(err => console.error(err))
  };

  toggleSort = () => {
    this.setState({oldestFirst: !this.state.oldestFirst}, this.handleSearch);
  }

  handleSave = (article) => {
    API.saveArticle(article)
      .then(response => {
        this.setState({redirectToSaved: true, latestSaved: response.data.id})
      })
      .catch(err => console.log(err));
  }

  render() {
    // TODO: double range slider for year selection
    if (this.state.redirectToSaved) return (<Redirect push to={"/saved/" + this.state.latestSaved} />);
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
            <Col size="12 sm-3">
              <h2>Search Results</h2>
            </Col>
            <Col size="12 sm-9" addclasses="text-right">
               {this.state.results.length ?
                (
                  <div>
                    <button type="button" className="btn btn-info mr-3" onClick={this.toggleSort}>
                      Sorting {this.state.oldestFirst ? "Oldest" : "Newest"} Articles First
                    </button>
                    <button type="button" className="btn btn-danger" onClick={() => this.setState({results: []})}>
                      Clear
                    </button>
                  </div>
                ) : ""
              }
            </Col>
          </Row>
          {this.state.results.length ?
            (
              <List>
              {this.state.results.map(r => {
                let button = (<button className="btn btn-success" onClick={() => this.handleSave(r)}>Save</button>);
                return (<ArticleListItem key={shortid()} article={r} button={button} />);
              })}
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

export default Search;

import React, { Component } from "react";
import moment from "moment";

import { Container } from "../../components/Grid";
import { Form, Input, FormButton } from "../../components/Form";

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
    console.log(this.state.searchTerm, this.state.startYear, this.state.endYear);
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
        <div>
          <h2>Search Results</h2>
          {this.state.results.length ?
            (
              <h3>All these results</h3>
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

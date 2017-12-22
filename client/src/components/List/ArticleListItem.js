import React from "react";
import moment from "moment";
import "./ArticleListItem.css";

import { Row, Col } from "../Grid";

export const ArticleListItem = ({article, button}) => (
  <li className="list-group-item">
    <Row>
      <Col size="6 sm-4 md-3">
        <img src={article.image} className="article-image" alt={article.snippet} />
      </Col>
      <Col size="12 sm-8 md-9">
        <h3><a href={article.url} target="_blank">{article.headline}</a></h3>
        <h4>
          {article.author}
          <br />
          <small>
            <span className="text-muted">{moment(article.published).format("MMMM Do YYYY")}</span>
          </small>
        </h4>
        <p className="snippet">{article.snippet}</p>
        <div className="text-right ali-button-container align-items-end">
          {button}
        </div>
      </Col>
    </Row>
  </li>
);

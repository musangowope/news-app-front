import React from "react";
import BlockLoader from "./BlockLoader";

export const SearchFormatLoader = () => (
  <div className="columns is-multiline">
    <div className="column is-6">
      <ArticleCardLoader />
    </div>
    <div className="column is-6">
      <ArticleCardLoader />
    </div>
  </div>
);

const ArticleCardLoader = () => {
  return (
    <div className="article-card-loader">
      <div className="article-card-loader__header">
        <BlockLoader />
      </div>
      <div className="article-card-loader__row">
        <BlockLoader />
      </div>
      <div className="article-card-loader__row">
        <BlockLoader />
      </div>
    </div>
  );
};

export default ArticleCardLoader;

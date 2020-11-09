import React from "react";
import PropTypes from "prop-types";
import placeholderSrc from "../images/article-image-placeholder.jpg";
import { hasValue } from "../utility-functions/hasValue.func";

const ArticleCard = ({
  title,
  author,
  articleImage,
  url,
  datePublished,
  articleSource,
}) => {
  return (
    <a target="_blank" rel="noreferrer" href={url} className="article-card">
      <div className="article-card__header">
        <div className="article-card__header__source-name">{articleSource}</div>
        <img
          className="article-card__header__img"
          src={hasValue(articleImage) ? articleImage : placeholderSrc}
          alt={title}
        />
      </div>
      <div className="article-card__title">{title}</div>
      <div className="article-card__author-date-wrapper">
        <div className="article-card__author-date-wrapper__author">
          {author}
        </div>
        <div className="article-card__author-date-wrapper__date">
          {datePublished}
        </div>
      </div>
    </a>
  );
};

ArticleCard.propTypes = {
  title: PropTypes.string,
  author: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  articleImage: PropTypes.string,
  url: PropTypes.string,
  coverImageUrl: PropTypes.string,
  datePublished: PropTypes.string,
  articleSource: PropTypes.string,
};
ArticleCard.defaultProps = {
  title: "",
  author: "",
  url: "",
  articleImage: "",
  coverImageUrl: "",
  datePublished: "",
  articleSource: "",
};

export default ArticleCard;

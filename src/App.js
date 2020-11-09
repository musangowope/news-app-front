import React from "react";
import useAxios from "./custom-hooks/useAxios";
import moment from "moment";
import api, { newsApiHeaderConfig } from "./constants/api";
import debounced from "./utility-functions/debounced.func";
import ArticleRangeDatePicker from "./components/ArticleRangeDatePicker";
import InlineSVG from "react-inlinesvg";
import SearchIconSrc from "./svgs/search.svg";
import { hasValue } from "./utility-functions/hasValue.func";
import ArticleCard from "./components/ArticleCard";
import { SearchFormatLoader } from "./components/ArticleCardLoader";
import SourcesFilter from "./components/SourcesFilter";

function App() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [sources, setSources] = React.useState([]);
  const [dateRangeQueryObj, setDateRange] = React.useState({
    from: "",
    to: "",
  });
  const debounceBuilder = debounced(200);

  const handleSearchInputChange = (e) => {
    e.preventDefault();
    debounceBuilder(() => {
      setSearchTerm(e.target.value);
    });
  };

  const handleDateChange = (dateRangeQueryObj) => {
    const newDateRange = {
      from: dateRangeQueryObj.startDate
        ? moment(dateRangeQueryObj.startDate).format("YYYY-MM-DD")
        : null,
      to: dateRangeQueryObj.endDate
        ? moment(dateRangeQueryObj.endDate).format("YYYY-MM-DD")
        : null,
    };
    setDateRange(newDateRange);
  };

  const sourcesQueryString = sources.map((source) => source.value).join(",");
  const sourcesTitle = sources.map((source) => source.label).join(", ");

  const queryObj = {
    q: searchTerm,
    pageSize: 10,
    language: "en",
    sources: sourcesQueryString,
    ...dateRangeQueryObj,
  };

  const {
    success,
    loading,
    failed,
    response: { articles = [] } = {},
  } = useAxios(api.getArticles(queryObj), "get", newsApiHeaderConfig);

  const formatAuthor = (titleData = null) => {
    /*For author title, api sometimes return array, this logic handles that*/
    try {
      const parsedData = JSON.parse(titleData);
      if (Array.isArray(parsedData)) {
        return parsedData[0].name;
      }
      return titleData;
    } catch (e) {
      return titleData;
    }
  };

  const formatDate = (date) => {
    return moment(date).format("ll");
  };

  const getLoader = () => <SearchFormatLoader />;

  const getCurrentDateTitle = () => {
    const dates = [];
    if (queryObj.from) {
      dates.push(moment(queryObj.from).format("ll"));
    }
    if (queryObj.to) {
      dates.push(moment(queryObj.to).format("ll"));
    }
    return dates.join("-");
  };

  const handleSourceFilteChange = (value) => {
    const newSources = hasValue(value) ? [...value] : [];
    setSources(newSources);
  };

  console.log(sources);

  return (
    <div className="container">
      <div className="home-view">
        <div className="home-view__title">News Stories</div>
        <p className="home-view__description">
          Get breaking news headlines, and search for articles from news sources{" "}
          <br />
          and blogs all over the web
        </p>

        <div className="home-view__search-wrapper">
          <div className="columns">
            <div className="column is-6">
              <div className="search-box">
                <InlineSVG className="search-box__icon" src={SearchIconSrc} />
                <input
                  className="search-box__field"
                  type="text"
                  placeholder="Type in topic of interest..."
                  onChange={handleSearchInputChange}
                />
              </div>
            </div>
            <div className="column is-6">
              <ArticleRangeDatePicker
                endDateId="start-date-picker"
                onDatesChange={handleDateChange}
                startDateId="end-date-picker"
              />
            </div>
          </div>

          <SourcesFilter onChange={handleSourceFilteChange} />
        </div>

        <div className="home-view__results-header">
          <div>
            <div className="home-view__results-header__title">
              {hasValue(searchTerm) ? `Results for: ${searchTerm}` : ""}
            </div>
            {hasValue(searchTerm) ? <div>{getCurrentDateTitle()}</div> : ""}
          </div>
          <div>{sources.length ? `Sources: ${sourcesTitle}` : ""}</div>
        </div>

        {loading ? getLoader() : null}
        {failed ? "Something went wrong" : null}
        {success ? (
          <div className="columns is-multiline">
            {articles.length && hasValue(searchTerm) ? (
              articles.map((article, key) => (
                <div className="column is-6" key={key}>
                  <ArticleCard
                    title={article.title}
                    datePublished={formatDate(article.publishedAt)}
                    articleImage={article.urlToImage}
                    author={formatAuthor(article.author)}
                    coverImageUrl={article.urlToImage}
                    url={article.url}
                    articleSource={article.source.name}
                  />
                </div>
              ))
            ) : (
              <div className="column">No results</div>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;

import { hasValue } from "../utility-functions/hasValue.func";

export const newsApiHeaderConfig = {
  headers: {
    "X-Api-Key": "e578276badac499da0325ac8cdeae327",
  },
}

const baseUrl = "https://newsapi.org/v2";
const articlesUrl = `${baseUrl}/everything`;
const sourcesUrl = `${baseUrl}/sources`

const buildArticlesRequestUrl = (queryObj = {}) => {
  if (queryObj.q) {
    const queryParamsString = Object.keys(queryObj)
      .filter((propName) => hasValue(queryObj[propName]))
      .map((propName) => `${propName}=${queryObj[propName]}`)
      .join("&");
    return `${articlesUrl}?${queryParamsString}`;
  }
  return "";
};

const api = {
  getArticles: (queryObj = {}) => buildArticlesRequestUrl(queryObj),
  getSources: () => sourcesUrl,
};

export default api;

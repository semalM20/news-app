import React, { useState, useEffect, useContext } from "react";
import NewsItem from "./NewsItem";
import SearchContext from "../context/SearchContext";

const SearchResults = () => {
  const SearchData = useContext(SearchContext);

  const [news, setNews] = useState(null);
  const [status, setStatus] = useState("ok");

  useEffect(() => {
    async function getData() {
      let url = `https://api.newscatcherapi.com/v2/search?page_size=18&lang=en&q=${SearchData.searchText}`;
      let response = await fetch(url, {
        method: "GET",
        headers: {
          // "x-api-key": "T6fTYpR1e4MtyzkqRCvOfoPy4cbgX0YPCho5VIMyHKs",
          "x-api-key": "process.env.REACT_APP_NEWS_API_KEY",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      setNews(data.articles);
      setStatus(data.status);
      // console.log(data);
    }
    getData();
  }, [SearchData.searchText]);

  if (status === "No matches for your search.") {
    return (
      <h1 className="display-5 text-center mt-4">
        No results found for {SearchData.searchText}
      </h1>
    );
  }

  if (!news) {
    return (
      <div className="container text-center mt-5">
        <div
          className="spinner-border mt-5"
          style={{ width: "5rem", height: "5rem" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <h1 className="display-5 text-center mt-4">
        {SearchData.searchText} Results
      </h1>
      <div className="container mt-4">
        <div className="row">
          {news.map((newsEl) => {
            return (
              <div className="col-md-6 col-lg-4 mb-4" key={newsEl._id}>
                <NewsItem
                  title={newsEl.title}
                  desc={newsEl.excerpt}
                  image={newsEl.media}
                  newsLink={newsEl.link}
                  pDate={newsEl.published_date}
                  source={newsEl.rights}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SearchResults;

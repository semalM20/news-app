import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";

const Home = () => {
  const [news, setNews] = useState(null);

  useEffect(() => {
    async function getData() {
      let url =
        "https://api.newscatcherapi.com/v2/latest_headlines?countries=US&topic=business&page_size=2";
      let response = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": "T6fTYpR1e4MtyzkqRCvOfoPy4cbgX0YPCho5VIMyHKs",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      let data = await response.json();
      setNews(data.articles);
      console.log(data);
    }
    getData();
  }, []);

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
      <h1 className="display-5 text-center mt-4">Home Page</h1>
      <div className="container mt-4">
        <div>
          {news.map((newsEl) => {
            return (
              <div className="col-md-4 mb-4">
                <NewsItem
                  key={newsEl._id}
                  title={newsEl.title}
                  desc={newsEl.excerpt}
                  image={newsEl.media}
                  newsLink={newsEl.link}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;

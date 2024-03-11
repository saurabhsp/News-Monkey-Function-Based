import React, { useEffect, useState } from "react";
import NewsItem from "../NewsItem";
import { Spinner } from "react-bootstrap";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
// import Spinner from "./Spinner";

const News = (props) => {
  const [articles, setarticles] = useState([]);
  const [loading, setloading] = useState(true);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const updateNews = async () => {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=9db0fdcb56e34407864da5fcdbabac38&page=${page}&pageSize=${props.pageSize}`;
    setloading(true);
    let data = await fetch(url);
    props.setProgress(40);
    let parsedData = await data.json();
    props.setProgress(70);
    setarticles(parsedData.articles);
    settotalResults(parsedData.totalResults);
    setloading(false);
    props.setProgress(100);
  };

  useEffect(() => {
    document.title=`${capitalizeFirstLetter(
      props.category
    )}-News-Monkey`
    updateNews();
    //elsint disable next line
  }, []);

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=9db0fdcb56e34407864da5fcdbabac38&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setpage(page + 1);
    let data = await fetch(url);
    let parsedData = await data.json();
    setarticles(articles.concat(parsedData.articles));
    settotalResults(parsedData.totalResults);
    loading(true)
  };

  return (
    <>
      <h1
        className="text-center"
        style={{ color: "#6b8900", margin: "35px", marginTop: "90px" }}
      >
        NewsMonkey- Top headlines of {capitalizeFirstLetter(props.category)}
      </h1>{" "}
      {/* {loading && (
          <div className="text-center">
            {<Spinner style={{ color: "#6b8900" }} />
            }
          </div>
        )} */}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={
          <div className="text-center my-3">
            <Spinner style={{ color: "#6b8900" }} />
          </div>
        }
        style={{ overflowY: "hidden" }} //thankyou this save me from vertically scrollbar shaking
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div
                  className="col-12 col-md-6 col-lg-3 mb-3"
                  key={element.url}
                >
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    Imageurl={element.urlToImage ? element.urlToImage : ""}
                    newsurl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
  News.defaultProps = {
    country: "in",
    pageSize: 12,
    category: "general",
    apikey: "9db0fdcb56e34407864da5fcdbabac38",
  };

  News.propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string.isRequired, // Make apiKey a required prop
  };
};
export default News;

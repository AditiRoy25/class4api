import axios from "axios";
import React, { useEffect, useState } from "react";
import { Country } from "country-state-city";

const NewsApi = () => {
  const apiKey = "4c669da55cde49adb3db04967fec1928";
  const [news, setNews] = useState([]);
  const countryList = Country?.getAllCountries();
  console.log("-----", countryList);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`
        );
        // console.log(response?.data?.articles);
        setNews(response?.data?.articles);
      } catch (error) {
        console.log(error);
      }
    };
    fetchNews();
  }, []);
  //   console.log(news);

  return (
    <>
      <h2>News List</h2>
      <div style={{ marginBottom: "10px" }}>
        <select name="" id="">
          <option value="">----select county----</option>
          {countryList?.map((country) => {
            return (
              <option key={country.isoCode} value={country.isoCode}>
                {country.name}
              </option>
            );
          })}
        </select>
      </div>
      <div>
        {news?.map((news, index) => {
          return (
            <div
              key={index}
              style={{
                border: "2px solid black",
                padding: "10px",
                marginBottom: "10px",
              }}
            >
              <a href={news.url} style={{}}>
                <h5>{news.title}</h5>
              </a>
              <p>{news.description}</p>
              <h2>AUTHOR : {news.author}</h2>


              <p>
  DATE: {new Date(news.publishedAt).toLocaleString()}
</p>

              {/* <p> DATE : {news.publishedAt}</p> */}
              {/* {const date = new Date(Date.UTC(2012, 11, 12, 3, 0, 0))}; */}
              <img
                src={news.urlToImage}
                style={{ height: "300px", width: "400px" }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default NewsApi;

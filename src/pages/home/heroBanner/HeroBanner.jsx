import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Img from "../../../components/lazyLoadImage/Img";
import { useSelector } from "react-redux";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import "./style.scss";

import useFetch from "../../../hooks/useFetch";

const HeroBanner = () => {
  const { url } = useSelector((state) => state.home);

  // state for changing the background of the hero banner page every time on refresh
  const [background, setBackground] = useState("");
  const [query, setQuery] = useState("");

  // API call
  const { data, loading } = useFetch("/movie/upcoming");

  useEffect(() => {
    const bg =
      url.backdrop +
      data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
    setBackground(bg);
  }, [data, url.backdrop]);

  const navigate = useNavigate();

  // Check search input not be empty and when hit the enter key then hit the API
  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
    }
  };

  return (
    <div className="heroBanner">
      {!loading && (
        <div className="backdrop-img">
          <Img src={background} />
        </div>
      )}
      <div className="opacity-layer"></div>

      <ContentWrapper>
        <div className="heroBannerContent">
          <span className="title">Welcome to MovieBazzar!</span>
          <span className="subTitle">
            Discover an Endless World of Movies and TV Shows. Explore now.
          </span>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for a movie or TV show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <button>Search</button>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default HeroBanner;

import React, { useContext, useEffect, useState } from "react";
import CardComp from "./CardComp";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import server from "../environment";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // Import carousel styles
import { Carousel } from "react-responsive-carousel";

const HeroSection = () => {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const router = useNavigate();

  const handleRoute = () => {
    router("/article");
  };

  return (
    <div className="hero_container">
      <h1>Hey {user ? user.first_name : "user"}! Create Your First Blog</h1>
      <div className="hero_content">
        <p>
          Share your thoughts and ideas with the world
          <button onClick={handleRoute}> Get Started </button>
        </p>
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          className="carousal_image"
        >
          <div>
            <img src="/news_Letter.jpg" alt="Image 1" />
          </div>
          <div>
            <img src="/girlboss.png" alt="Image 2" />
          </div>
          <div>
            <img src="/he-spoke.png" alt="Image 3" />
          </div>
          <div>
            <img src="/homepage.png" alt="Image 4" />
          </div>
          <div>
            <img src="/websitepng.png" alt="Image 5" />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default HeroSection;

import React, { useEffect, useState } from "react";
import axios from "axios";
import CardComp from "../component/CardComp"; // Assuming you have a BlogCard component for displaying blogs
import Header from "./Header";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import ArticleComponent from "../component/ArticleComponent";
import HeroSection from "../component/HeroSection";
import About from "../component/About";
import server from "../environment";

const AppLayout = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${server}/api/v1/article/getPosts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
          []
        );
        setBlogs(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      <HeroSection />
      <div className="grid p-8  grid-cols-5 grid-rows-5 gap-4">
        {blogs.map((blog) => (
          <CardComp key={blog._id} article={blog} />
        ))}
      </div>

      {/* <Outlet /> */}
      <Footer />
    </div>
  );
};

export default AppLayout;

import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DateConverter from "../dateconverter/DateConverter";
import { Link } from "react-router-dom";
import { useState } from "react";

const Post = ({ post }) => {
  // Set constants for Category Color
  const categoryColors = {
    "Data Management": "#0077B5",
    "Digital Marketing": "#FFC107",
    "Ecommerce": "#FF5722",
    "Email Marketing": "#8E44AD",
    "Landing Pages": "#4CAF50",
    "Marketing Automation": "#3F51B5",
    "Marketing Analytics": "#E91E63",
    "Platform News and Updates": "#689F38",
    "Surveys and Forms": "#D81B60",
    "Tips and Best Practise": "#03A9F4",
    // add more category-color mappings as needed
  };
  
  const liked = false;

  // Create a set to remove duplicate categories
  const uniqueCategories = new Set();
  
  return (
    <div className="post">
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.author.avatar} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.author.name}</span>
              </Link>
              <span className="date"><DateConverter date={post.publishDate} /></span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.summary}</p>
          <img src={post.img} alt="" />
        </div>
        <div className="info">
        {post.categories.map((item) => {
          if (uniqueCategories.has(item.name)) {
            return null; // skip rendering duplicate category
          }
          uniqueCategories.add(item.name);
          return (
            <div
              key={item.name} // use category name as key
              className="item"
              style={{ color: categoryColors[item.name] }}
            >
              {item.name}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
};

export default Post;

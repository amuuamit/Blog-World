import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ShareIcon from "@mui/icons-material/Share";
import { useNavigate } from "react-router-dom";
import { ReadMore } from "@mui/icons-material";
import axios from "axios";
import server from "../environment";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
}));

const CardComp = ({ article }) => {
  const navigate = useNavigate();

  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [blog, setBlogs] = useState([]);

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     try {
  //       const response = await axios.get(`${server}/api/v1/article/getPosts`, {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       });
  //       setBlogs(response.data);
  //     } catch (error) {
  //       console.error("Error fetching blogs:", error);
  //     }
  //   };
  //   fetchBlogs();
  // }, []);

  const handleExpandReadMore = () => {
    navigate("/readmore" || "/searchResults", { state: { article } });
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const truncateDescription = (description, wordLimit) => {
    const words = description.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + " ...";
    }
    return description;
  };

  const handleShare = () => {
    const shareData = {
      title: article.article_title,
      text: article.article_description,
      url: window.location.origin + `/readmore?articleId=${article._id}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log("Article shared successfully"))
        .catch((error) => console.error("Error sharing article:", error));
    } else {
      navigator.clipboard
        .writeText(shareData.url)
        .then(() => alert("Article link copied to clipboard!"))
        .catch((error) => console.error("Error copying link:", error));
    }
  };

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
      setLiked(false);
    } else {
      setLikes(likes + 1);
      if (disliked) {
        setDislikes(dislikes - 1);
        setDisliked(false);
      }
      setLiked(true);
    }
  };

  const handleDislike = () => {
    if (disliked) {
      setDislikes(dislikes - 1);
      setDisliked(false);
    } else {
      setDislikes(dislikes + 1);
      if (liked) {
        setLikes(likes - 1);
        setLiked(false);
      }
      setDisliked(true);
    }
  };

  return (
    <Card sx={{ maxWidth: 500, marginBottom: 2 }}>
      <CardHeader
        // title={article.article_title}
        title={truncateDescription(article.article_title, 7)}
        subheader={formatDate(article.createdAt)}
      />
      <CardMedia
        component="img"
        height="194"
        image={article.image || "/Blog.jpg"}
        alt="Article image"
      />
      <CardContent>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {truncateDescription(article.article_description, 20)}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleLike}>
          <FavoriteIcon color={liked ? "error" : "inherit"} />
        </IconButton>
        <IconButton aria-label="dislike" onClick={handleDislike}>
          <ThumbDownIcon color={disliked ? "error" : "inherit"} />
        </IconButton>
        <IconButton aria-label="share" onClick={handleShare}>
          <ShareIcon />
        </IconButton>
        <ExpandMore onClick={handleExpandReadMore} aria-label="show more">
          <ReadMore />
        </ExpandMore>
      </CardActions>
    </Card>
  );
};

export default CardComp;

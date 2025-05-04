import * as React from 'react';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useNavigate, useLocation } from 'react-router-dom';
import CommentComp from './CommentComp';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
}));

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5',
    },
    text: {
      primary: '#333',
      secondary: '#666',
    },
  },
});

export default function ReadMore() {
  const [expanded, setExpanded] = React.useState(true);
  const [like, setLike] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { article } = location.state || {};

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (!article) {
    return <div>No article data available</div>;
  }

  // console.log("Article id", article._id)
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleFavourite = (event) => {
    event.preventDefault();
    setLike(!like);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card sx={{ maxWidth: 3450, margin: 15, backgroundColor: '#f5f5f5' }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {article.user.first_name[0]}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={article.article_title}
          subheader={formatDate(article.createdAt)}
        />
        <CardMedia
          component="img"
          height="600"
          image={article.image || "/Users/amityadav/PW-Projects/MERN_Project/Blog-App/Forntend/public/Blog.jpg"}
          alt="Article image"
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {article.article_description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleFavourite} color={like ? 'error' : 'default'}>
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography sx={{ marginBottom: 2 }}>
              {article.article_description}
            </Typography>
          </CardContent>
        </Collapse>
      <CommentComp articleId={article._id} />
      </Card>
    </ThemeProvider>
  );
}

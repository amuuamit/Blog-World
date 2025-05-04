import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom"; // Import NavLink for navigation
import { Button } from "@mui/material";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Badge,
  MenuItem,
  Menu,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  AccountCircle,
  Mail as MailIcon,
  Notifications as NotificationsIcon,
  MoreVert as MoreIcon,
} from "@mui/icons-material";

// Styled Components for Search Box
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": { backgroundColor: alpha(theme.palette.common.white, 0.25) },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: { marginLeft: theme.spacing(3), width: "auto" },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: { width: "20ch" },
  },
}));

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const router = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfile = () => {
    router("/profile");
  };
  const handleMyAccount = () => {
    router("/myAccount");
  };
  const handleSearch = () => {
    router("/searchResults");
  };
  const handleUserProfile = () => {
    router("/profile");
  };

  const handleMobileMenuOpen = (event) =>
    setMobileMoreAnchorEl(event.currentTarget);
  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);

  const menuId = "primary-search-account-menu";
  const mobileMenuId = "primary-search-account-menu-mobile";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id={menuId}
      keepMounted
      open={isMenuOpen}
      // onClose={handleMenuClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem onClick={handleProfile}>Profile</MenuItem>
      <MenuItem onClick={handleMyAccount}>My account</MenuItem>
    </Menu>
  );

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      id={mobileMenuId}
      keepMounted
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" color="inherit">
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton size="large" color="inherit">
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  const handleLogout = () => {
    localStorage.removeItem("token");
    alert("You are Logged Out");
    router("/login");
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        sx={{ bgcolor: (theme) => theme.palette.grey[800] }}
      >
        <Toolbar>
          {/* Left Menu Icon */}
          <IconButton size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
            <img
              src="./blog-icon.png"
              style={{ width: "50px" }}
              alt="Blog Icon"
            />
          </IconButton>

          {/* Title */}
          <Typography
            variant="h6"
            noWrap
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            Blog App
          </Typography>

          {/* Search Bar */}
          <div className="search-bar-container">
            <button className="search-button" onClick={handleSearch}>
              Search Posts
            </button>
          </div>

          <Box sx={{ flexGrow: 1 }} />

          {/* Navigation Links  */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 5 }}>
            Home
            <NavLink
              to="/contact"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              Contact
            </NavLink>
            <NavLink
              to="/about"
              style={{
                color: "white",
                textDecoration: "none",
                fontSize: "16px",
              }}
            >
              About
            </NavLink>
            <button
              style={{
                color: "white",
                background: "transparent",
                border: "none",
                textDecoration: "none",
                fontSize: "16px",
                cursor: "pointer",
              }}
              onClick={handleLogout}
            >
              Log Out
            </button>
          </Box>

          <button onClick={handleUserProfile}>User Profile</button>

          {/* Mobile Menu Icon */}
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              color="inherit"
              onClick={handleMobileMenuOpen}
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Render Menus */}
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}

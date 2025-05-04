import React from "react";
import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import AppLayout from "./layout/AppLayout";
import { AuthProvider } from "./context/AuthContext";
import ArticlesComponent from "./component/ArticleComponent";
import ReadMore from "./component/ReadMore";
import About from "./component/About";
import Profile from "./component/Profile";
import MyAccount from "./component/MyAccount";
import Contact from "./component/Contact";
import SearchResult from "./component/SearchResult";
function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* <Route path='/' element={ <AppLayout/>} /> */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/home" element={<AppLayout />} />
        <Route path="/article" element={<ArticlesComponent />} />
        <Route path="/readmore" element={<ReadMore />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/myAccount" element={<MyAccount />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/searchResults" element={<SearchResult />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppContext } from "../../hooks/useAppContext";
import Home from "../../pages/Home";
import Users from "../../pages/Users";
import Header from "../Header";
import NewPost from "../../pages/NewPost";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
function FetchProjects() {
  const { fetchPosts, fetchUsers } = useAppContext();

  useEffect(() => {
    fetchPosts();
    fetchUsers();
  }, []);

  return (
    <div>
      <Header />
      <Routes>
        <Route path="posts" element={<Home />} />
        <Route path="users" element={<Users />} />
        <Route path="new-post" element={<NewPost />} />
      </Routes>
    </div>
  );
}

export default FetchProjects;

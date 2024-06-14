import React from "react";
import { useAppContext } from "../hooks/useAppContext";

const Users = () => {
  const { users } = useAppContext();

  return (
    <div style={containerStyle}>
      <h1>Users</h1>
      <ul style={listStyle}>
        {users.map((user) => (
          <li key={user.id} style={userItemStyle}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

const containerStyle = {
  padding: "20px",
};

const listStyle = {
  listStyle: "none",
  padding: "0",
};

const userItemStyle = {
  borderBottom: "1px solid #ddd",
  padding: "10px 0",
};

export default Users;

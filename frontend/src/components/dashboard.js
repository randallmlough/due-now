import React from "react";
export default props => {
  const { user } = props.location.state;
  return (
    <div>
      <h1>{user.first_name}'s Dashboard</h1>
      <ul>
        <li>id: {user.id}</li>
        <li>first_name: {user.first_name}</li>
        <li>last_name: {user.last_name}</li>
        <li>created_at: {user.created_at}</li>
      </ul>
    </div>
  );
};

import React, { useState } from "react";
import axios from "axios";
export default props => {
  const initialState = {
    first_name: "",
    last_name: "",
    email: "",
    password: ""
  };
  const [user, setUser] = useState(initialState);
  const handleSubmit = e => {
    e.preventDefault();
    axios({
      baseURL: "/api",
      method: "post",
      url: "/auth/register",
      data: user,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(resp => {
        props.history.push({
          pathname: "/",
          state: { user: resp.data.user }
        });
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          onChange={e => setUser({ ...user, first_name: e.target.value })}
          value={user.first_name}
          placeholder="First Name"
        />
        <input
          type="text"
          onChange={e => setUser({ ...user, last_name: e.target.value })}
          value={user.last_name}
          placeholder="Last Name"
        />
        <input
          type="text"
          onChange={e => setUser({ ...user, email: e.target.value })}
          value={user.email}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={e => setUser({ ...user, password: e.target.value })}
          value={user.password}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

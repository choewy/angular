import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentToken, selectCurrentUser } from "./authSlice";

const Welcome: React.FC = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);
  const welcome = user ? `Welcome ${user}!` : "Welcome";
  const tokenAbbr = token ? `${token.slice(0, 9)}...` : "";

  const content = (
    <section className="welcome">
      <h1>{welcome}</h1>
      <p>token : {tokenAbbr}</p>
      <p>
        <Link to="users" />
        Go to the User List Page
      </p>
    </section>
  );

  return content;
};

export default Welcome;

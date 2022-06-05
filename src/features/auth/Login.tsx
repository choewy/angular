import React, { useRef, useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "./authApiSlice";
import { setCredentials } from "./authSlice";
import authException from "./authException";

type InputRef = React.MutableRefObject<HTMLInputElement>;
type ParagraphRef = React.MutableRefObject<HTMLParagraphElement>;
type ChangeEvent = React.ChangeEvent<HTMLInputElement>;

const Login: React.FC = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const errorRef = useRef<HTMLParagraphElement>(null);
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const userElement = usernameRef as InputRef;
    userElement.current.focus();
  }, []);

  useEffect(() => {
    setErrorMessage("");
  }, [user, password]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userData = await login({ user, password }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPassword("");
      navigate("/welcome");
    } catch (error: any) {
      authException({ error, setErrorMessage });
      const errorElement = errorRef as ParagraphRef;
      if (errorElement) {
        errorElement.current.focus();
      }
    }
  };

  const onUserChange = useCallback(
    (e: ChangeEvent) => setUser(e.target.value),
    [],
  );

  const onPasswordChange = useCallback(
    (e: ChangeEvent) => setPassword(e.target.value),
    [],
  );

  const content = isLoading ? (
    <h1>Loading....</h1>
  ) : (
    <section>
      <p ref={errorRef} className={errorMessage ? "errmsg" : "offscreen"}>
        {errorMessage}
      </p>
      <h1>Login Form</h1>
      <form onSubmit={onSubmit}>
        <label htmlFor="username">UserName:</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          value={user}
          onChange={onUserChange}
          autoComplete="off"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={onPasswordChange}
          autoComplete="off"
          required
        />

        <button type="submit">Sign In</button>
      </form>
    </section>
  );

  return content;
};

export default Login;

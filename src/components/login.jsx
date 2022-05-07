import React, { useState, useEffect } from "react";
import Joi, { schema } from "joi-browser";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    errors: {},
  });

  const err = (schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    if (errors) return;

    // Call Backend
    console.log("Submit");
  };

  const validate = () => {
    const errors = {};
    const allState = { ...state };
    delete allState.errors;
    const res = Joi.validate(allState, err, { abortEarly: false });

    if (res.error === null) {
      setState({ errors: {} });
      return null;
    }

    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }

    // Set State
    setState({ errors });
  };

  const handleChange = (e) => {
    // Clone
    let allState = { ...state };
    // Edit
    allState[e.currentTarget.name] = e.currentTarget.value;
    // Set State
    setState(allState);
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            name="email"
            value={state.email}
            onChange={handleChange}
            type="email"
            placeholder="Your Email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
          {state.errors.email && (
            <div className="alert alert-danger">{state.errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={state.password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        {state.errors.password && (
          <div className="alert alert-danger">{state.errors.password}</div>
        )}
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;

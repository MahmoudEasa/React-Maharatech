import React, { useState, useEffect } from "react";
import Joi, { schema } from "joi-browser";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [errors, seterrors] = useState({});

  schema = {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    if (errors) return;

    // Call Backend
    console.log("Submit");
  };

  const validate = () => {
    const errors = {};

    const res = Joi.validate({ email, password }, schema, {
      abortEarly: false,
    });

    // console.log(res);

    if (res.error === null) {
      seterrors({});
      return null;
    }

    for (const error of res.error.details) {
      errors[error.path] = error.message;
    }

    // Set State
    seterrors(errors);
  };

  const handleChange = (e) => {
    // Clone
    let allState = { email, password };
    // Edit
    allState[e.currentTarget.name] = e.currentTarget.value;
    // Set State
    setemail(allState.email);
    setpassword(allState.password);
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
            value={email}
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
          {errors.email && (
            <div className="alert alert-danger">{errors.email}</div>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            name="password"
            value={password}
            onChange={handleChange}
            type="password"
            placeholder="Password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        {errors.password && (
          <div className="alert alert-danger">{errors.password}</div>
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

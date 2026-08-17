import { useState } from "react";
import "../styles/style.css";

function Login({ onLogin, onShowSignup }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");

    const savedUser =
      localStorage.getItem("netflixUser");

    if (!savedUser) {

      setError(
        "No account found. Please sign up first."
      );

      return;
    }

    try {

      const user = JSON.parse(savedUser);

      if (
        user.email !== email.trim() ||
        user.password !== password
      ) {

        setError(
          "Incorrect email or password."
        );

        return;
      }

      localStorage.setItem(
        "netflixLoggedIn",
        "true"
      );

      onLogin(user);

    } catch (error) {

      console.error(
        "Login error:",
        error
      );

      setError(
        "Something went wrong. Please try again."
      );

    }
  };


  return (

    <div className="auth-page">

      <div className="auth-overlay"></div>

      <div className="auth-card">

        <h1>Sign In</h1>

        {error && (
          <p className="auth-error">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="auth-submit"
          >
            Sign In
          </button>

        </form>

        <p className="auth-switch">

          New to Netflix?

          <button
            type="button"
            onClick={onShowSignup}
          >
            Sign up now.
          </button>

        </p>

      </div>

    </div>

  );
}

export default Login;
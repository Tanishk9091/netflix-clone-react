import { useState } from "react";
import "../styles/style.css";

function Signup({ onSignup, onShowLogin }) {

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");


  const handleSubmit = (e) => {

    e.preventDefault();

    setError("");


    // =================================================
    // PASSWORD CHECK
    // =================================================

    if (password.length < 6) {

      setError(
        "Password must be at least 6 characters."
      );

      return;
    }


    // =================================================
    // CONFIRM PASSWORD
    // =================================================

    if (password !== confirmPassword) {

      setError(
        "Passwords do not match."
      );

      return;
    }


    // =================================================
    // CHECK EXISTING ACCOUNT
    // =================================================

    const existingUser =
      localStorage.getItem(
        "netflixUser"
      );

    if (existingUser) {

      try {

        const user =
          JSON.parse(existingUser);

        if (
          user.email ===
          email.trim()
        ) {

          setError(
            "An account with this email already exists."
          );

          return;
        }

      } catch (error) {

        console.error(
          "Existing user error:",
          error
        );

      }
    }


    // =================================================
    // CREATE USER
    // =================================================

    const newUser = {

      name:
        name.trim(),

      email:
        email.trim(),

      password,

    };


    localStorage.setItem(
      "netflixUser",
      JSON.stringify(newUser)
    );


    // =================================================
    // LOGIN USER AUTOMATICALLY
    // =================================================

    localStorage.setItem(
      "netflixLoggedIn",
      "true"
    );


    onSignup(newUser);

  };


  return (

    <div className="auth-page">

      <div className="auth-overlay"></div>

      <div className="auth-card">

        <h1>Sign Up</h1>


        {error && (

          <p className="auth-error">
            {error}
          </p>

        )}


        <form onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />


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


          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) =>
              setConfirmPassword(
                e.target.value
              )
            }
            required
          />


          <button
            type="submit"
            className="auth-submit"
          >
            Sign Up
          </button>

        </form>


        <p className="auth-switch">

          Already have an account?

          <button
            type="button"
            onClick={onShowLogin}
          >
            Sign in now.
          </button>

        </p>

      </div>

    </div>

  );
}

export default Signup;
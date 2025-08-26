import React from "react";
import "./signup.css";

function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>Sign up</h2>
        <p className="subtitle">Sign up to continue</p>

        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />

          <button type="submit" className="signup-btn">Sign up</button>

          <div className="checkbox-row">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
        </form>

        <div className="divider">ACCESS QUICKLY</div>

        <div className="social-buttons">
          <button className="google">Google</button>
          <button className="linkedin">LinkedIn</button>
          <button className="sso">SSO</button>
        </div>

        <p className="signin-text">
          Already have an account? <a href="/login">Sign in</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;

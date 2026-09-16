import { useState } from "react";

function Signup({ onSignup, onLogin, onGuest }) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
      return;
    }

    setPasswordError("");
    onSignup();
  };

  return (
    <div className="auth-page">

      <div className="auth-container">

        {/* LEFT SIDE */}

        <div className="auth-brand">

          <div className="brand-content">

            <div className="brand-logo">
              M
            </div>

            <h1>My Store</h1>

            <p>
              Create your account and start
              discovering something new.
            </p>

            <div className="brand-features">

              <span>✓ Easy Shopping</span>
              <span>✓ Save Your Cart</span>
              <span>✓ Personalized Experience</span>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="auth-form-container">

          <div className="auth-form">

            <span className="auth-small-title">
              GET STARTED
            </span>

            <h2>
              Create your account
            </h2>

            <p className="auth-description">
              Join My Store and start shopping
              today.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>
                  Full Name
                </label>

                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Create a password"
                  minLength={8}
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                />

              </div>

              <div className="form-group">

                <label>
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm your password"
                  minLength={8}
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                />

                {passwordError && (
                  <p className="password-error">
                    {passwordError}
                  </p>
                )}

              </div>

              <button
                type="submit"
                className="auth-submit-button"
              >
                Create Account
              </button>

            </form>

            <div className="auth-divider">
              <span>OR</span>
            </div>

            <button
              className="guest-button"
              onClick={onGuest}
            >
              Continue as Guest
            </button>

            <p className="auth-switch">

              Already have an account?

              <button onClick={onLogin}>
                Sign in
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Signup;
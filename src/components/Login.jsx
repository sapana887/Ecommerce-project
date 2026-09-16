function Login({ onLogin, onSignup, onGuest }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin();
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
              Discover products you love,
              all in one place.
            </p>

            <div className="brand-features">
              <span>✓ Quality Products</span>
              <span>✓ Easy Shopping</span>
              <span>✓ Secure Experience</span>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}
        <div className="auth-form-container">

          <div className="auth-form">

            <span className="auth-small-title">
              WELCOME BACK
            </span>

            <h2>Login in to your account</h2>

            <p className="auth-description">
              Enter your details to continue shopping.
            </p>

            <form onSubmit={handleSubmit}>

              <div className="form-group">

                <label>Email Address</label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  required
                />

              </div>

              <div className="form-group">

                <div className="label-row">

                  <label>Password</label>

                  <button
                    type="button"
                    className="forgot-button"
                    onClick={() =>
                      alert(
                        "Password reset is UI-only for now."
                      )
                    }
                  >
                    Forgot password?
                  </button>

                </div>

                <input
                  type="password"
                  placeholder="Enter your password"
                  minLength="8"
                  required
                />

              </div>

              <label className="remember-me">

                <input type="checkbox" />

                <span>Remember me</span>

              </label>

              <button
                type="submit"
                className="auth-submit-button"
              >
                Sign In
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

              Don't have an account?

              <button onClick={onSignup}>
                Create account
              </button>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;
import "../components/styles/Login.css";

export default function Login() {
  return (
    <div className="login-page">
      <form className="login-form">
        <h2 className="login-title">Login</h2>

        <label className="email-label" htmlFor="email">
          Email
        </label>

        <input className="email-input" />

        <br />

        <label htmlFor="password" className="password-label">
          Password
        </label>

        <input className="password-input" />

        <br />

        <button className="login-button">Login</button>
      </form>
    </div>
  );
}

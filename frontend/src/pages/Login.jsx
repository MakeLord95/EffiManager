import "../components/styles/Login.css";
import useField from "../hooks/useField";
import useLogin from "../hooks/useLogin";

export default function Login() {
  const { login } = useLogin();

  const email = useField("email");
  const password = useField("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email.value, password.value);
  };

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

        <button onClick={handleSubmit} className="login-button">
          Login
        </button>
      </form>
    </div>
  );
}

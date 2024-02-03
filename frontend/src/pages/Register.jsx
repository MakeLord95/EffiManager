import "../components/styles/Register.css";
import useField from "../hooks/useField";
import useRegister from "../hooks/useRegister";

export default function Register({ setIsAuthenticated }) {
  const { register } = useRegister({ setIsAuthenticated });

  const email = useField("email");
  const password = useField("password");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(email.value, password.value);
  };

  return (
    <div className="register-page">
      <form className="register-form">
        <h2 className="register-title">Register</h2>

        <label className="email-label" htmlFor="email">
          Email
        </label>

        <input {...email} className="email-input" />

        <br />

        <label htmlFor="password" className="password-label">
          Password
        </label>

        <input {...password} className="password-input" />

        <br />

        <button onClick={handleSubmit} className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

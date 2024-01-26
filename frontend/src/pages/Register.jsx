import useField from "../hooks/useField";

export default function Register() {
  const email = useField("email");
  const password = useField("password");

  const handleRegister = (e) => {
    e.preventDefault();
    console.log(email.value, password.value);
  };

  return (
    <div>
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

        <button onClick={handleRegister} className="register-button">
          Register
        </button>
      </form>
    </div>
  );
}

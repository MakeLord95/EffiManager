// Home.jsx
import { Link } from "react-router-dom";

export default function Home({ isAuthenticated }) {
  console.log(isAuthenticated);
  return (
    <section className="hero" id="home">
      {!isAuthenticated && (
        <div className="hero-banner">
          <h1>EffiManager</h1>
          <p>Efficiently manage your personal tasks</p>
          <Link to="/register" className="btn btn-hero">
            Register
          </Link>
          <Link to="/login" className="btn btn-hero">
            Login
          </Link>
        </div>
      )}
      {isAuthenticated && (
        <div className="hero-banner">
          <h1>EffiManager</h1>
          <p>Efficiently manage your personal tasks</p>
          <Link to="/dashboard" className="btn btn-hero">
            Dashboard
          </Link>
        </div>
      )}
    </section>
  );
}

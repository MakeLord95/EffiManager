// Home.jsx
import { Link } from "react-router-dom";

export default function Home({ isAuthenticated }) {
  return (
    <section className="hero" id="home">
      {!isAuthenticated && (
        <div className="hero-banner">
          <h1>EffiManager</h1>
          <p>Efficiently manage your personal tasks</p>
          <Link to="/register" className="btn btn-hero">
            Get Started
          </Link>
        </div>
      )}
    </section>
  );
}

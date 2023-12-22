// Footer.js
import "./styles/Footer.css";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer>
      {" "}
      <strong>{`Copyright © Markus Salin 2023 - ${year}`} </strong>{" "}
    </footer>
  );
}

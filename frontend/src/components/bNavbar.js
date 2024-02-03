// bNavbar.js
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./styles/Navbar.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BNavbar({ isAuthenticated, setIsAuthenticated }) {
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="myBlue"
      variant="dark"
      sticky="top"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            className="logo"
            alt="EffiManager"
            width="50px"
            height="50px"
            src="https://placehold.co/50"
          />{" "}
          EffiManager
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto">
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>

                <Nav.Link
                  as={Link}
                  to="/login"
                  onClick={() => {
                    localStorage.removeItem("token");
                    localStorage.removeItem("email");
                    setIsAuthenticated(false);
                  }}
                >
                  Logout
                </Nav.Link>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/login">
                  Sign In
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { Navbar, Nav, NavDropdown } from "react-bootstrap";

function Header() {
  const auth = useSelector((state) => state.auth);

  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/login";
    } catch (err) {
      window.location.href = "/";
    }
  };

  const NavBarTitle = () => (
    <>
      <img
        src={user.avatar}
        alt=""
        style={{ width: "2rem", borderRadius: "50%", height: "2rem" }}
      />{" "}
      {user.name}
    </>
  );
  return (
    <Navbar expand="lg" style={{ height: "6vh", background: "#2dd6c8b0" }}>
      <Navbar.Brand to="/home" as={Link}>
        Real Time Web Chat
      </Navbar.Brand>

      <Nav
        className="mr-auto my-2 my-lg-0"
        style={{ maxHeight: "100px" }}
        navbarScroll
      ></Nav>
      <Nav className="d-flex">
        {isLogged ? (
          <Nav
            className="mr-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link to="/join" as={Link}>
              join
            </Nav.Link>

            <NavDropdown title={NavBarTitle()} id="navbarScrollingDropdown">
              <NavDropdown.Item>
                <Link to="/profile">Profile</Link>
              </NavDropdown.Item>
              <NavDropdown.Item>
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        ) : (
          <Nav>
            <Nav.Link to="/register" as={Link}>
              Signup
            </Nav.Link>
            <Nav.Link to="/login" as={Link}>
              Login
            </Nav.Link>
          </Nav>
        )}
      </Nav>
    </Navbar>
  );
}

export default Header;

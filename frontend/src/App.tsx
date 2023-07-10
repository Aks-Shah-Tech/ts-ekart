import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Row,
} from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Store } from "./Store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LinkContainer } from "react-router-bootstrap";

function App() {
  const {
    state: { mode, cart, userInfo },
    dispatch,
  } = useContext(Store);

  useEffect(() => {
    document.body.setAttribute("data-bs-theme", mode);
  }, [mode]);

  const switchModeHandler = () => {
    dispatch({ type: "SWITCH_MODE" });
  };

  const signoutHandler = () => {
    dispatch({ type: "USER_SIGNOUT" });
    localStorage.removeItem("userInfo");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("shippingAddress");
    localStorage.removeItem("paymentMethod");
    window.location.href = "/signin";
  };

  return (
    // <div className="d-flex flex-column vh-100">
    //   <header>
    //     <Navbar bg="dark" variant="dark" expand="lg">
    //       <Container>
    //         <Navbar.Brand>TSEKART</Navbar.Brand>
    //       </Container>
    //       <Nav>
    //         <a href="/cart" className="nav-link">
    //           Cart
    //         </a>
    //         <a href="/signin" className="nav-link">
    //           Sign In
    //         </a>
    //       </Nav>
    //     </Navbar>
    //   </header>
    //   <main>
    //     <Container className="mt-3">
    //       <Outlet />
    //     </Container>
    //   </main>
    //   <footer>
    //     <div className="text-center">All rights reserved</div>
    //   </footer>
    // </div>
    <div className="vh-100">
      <ToastContainer position="bottom-center" limit={1} />
      <header>
        <Navbar expand="lg" className="shadow">
          <Container fluid>
            <LinkContainer to="/">
              <Navbar.Brand href="#">TSEKART</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="ms-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Button variant={mode} onClick={switchModeHandler}>
                  <i
                    className={mode === "light" ? "fa fa-sun" : "fa fa-moon"}
                  ></i>
                </Button>
                <LinkContainer to="/cart">
                  <Nav.Link>
                    Cart
                    {cart.cartItems.length > 0 && (
                      <Badge pill bg="danger">
                        {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                      </Badge>
                    )}
                  </Nav.Link>
                </LinkContainer>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to="/orderhistory">
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <Link
                      className="dropdown-item"
                      to="#signout"
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-4">
          <Outlet />
        </Container>
      </main>
      <footer>
        <div className="text-center">All rights reserved</div>
      </footer>
    </div>
  );
}

export default App;

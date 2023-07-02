import { Badge, Button, Col, Container, Form, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { sampleProducts } from "./data";
import { Link, Outlet } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Store } from "./Store";

function App() {
  const {state: {mode, cart}, dispatch} = useContext(Store)

  useEffect(() => {
    document.body.setAttribute('data-bs-theme', mode)
  }, [mode])

  const switchModeHandler = () => {
    dispatch({ type: 'SWITCH_MODE' })
  }
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
      <header>
      <Navbar expand="lg" className="shadow">
      <Container fluid>
        <Navbar.Brand href="#">TSEKART</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="ms-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Button variant={mode} onClick={switchModeHandler}>
              <i className={mode === 'light' ? 'fa fa-sun' : 'fa fa-moon'}></i>
            </Button>
            <Nav.Link>
            <Link to="/cart">
              Cart
              {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
            </Link>
            </Nav.Link>
            <Nav.Link href="#action2">Sign In</Nav.Link>
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

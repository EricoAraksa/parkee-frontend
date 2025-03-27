import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Typography } from "@mui/material";

function NavigationBar() {
  return (
    <AppBar position="static" sx={{ bgcolor: "#212121" }}>
      <Toolbar>
        <Container className="d-flex justify-content-between">
          <Typography variant="h6" component={Link} to="/" style={{ color: "white", textDecoration: "none" }}>
            🚗 Parkee
          </Typography>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className="text-light mx-2">Home</Nav.Link>
            <Nav.Link as={Link} to="/checkin" className="text-light mx-2">Check-In</Nav.Link>
            <Nav.Link as={Link} to="/checkout" className="text-light mx-2">Check-Out</Nav.Link>
            <Nav.Link as={Link} to="/status" className="text-light mx-2">Parking Status</Nav.Link>
          </Nav>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationBar;

import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";

function CheckIn() {
  const [plateNumber, setPlateNumber] = useState("");

  const handleCheckIn = () => {
    if (!plateNumber.trim()) {
      alert("Please enter a plate number!");
      return;
    }

    fetch("http://localhost:8000/checkInVehicle.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plate_number: plateNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          alert("Check-in successful!");
          setPlateNumber("");
        } else {
          alert(data.error);
        }
      })
      .catch((error) => console.error("Error checking in:", error));
  };

  return (
    <Container className="mt-5">
      <h2>Check-In Vehicle</h2>
      <Form className="d-flex">
        <Form.Control
          type="text"
          placeholder="Enter Plate Number"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <Button variant="success" onClick={handleCheckIn}>Check In</Button>
      </Form>
    </Container>
  );
}

export default CheckIn;

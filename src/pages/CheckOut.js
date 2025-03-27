import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";

function CheckOut() {
  const [plateNumber, setPlateNumber] = useState("");

  const handleCheckOut = () => {
    if (!plateNumber.trim()) {
      alert("Please enter a plate number!");
      return;
    }
  
    fetch("http://localhost:8000/checkOutVehicle.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plate_number: plateNumber }),
    })
      .then((response) => response.json()) 
      .then((data) => {
        console.log("Server response:", data); 
        if (data.message) { 
          alert(`Check-out successful! Fee: IDR ${data.total_price}`);
          setPlateNumber("");
        } else {
          alert(data.error || "Check-out failed.");
        }
      })
      .catch((error) => console.error("Error checking out:", error));
  };

  return (
    <Container className="mt-5">
      <h2>Check-Out Vehicle</h2>
      <Form className="d-flex">
        <Form.Control
          type="text"
          placeholder="Enter Plate Number"
          value={plateNumber}
          onChange={(e) => setPlateNumber(e.target.value)}
          style={{ width: "300px", marginRight: "10px" }}
        />
        <Button variant="danger" onClick={handleCheckOut}>Check Out</Button>
      </Form>
    </Container>
  );
}

export default CheckOut;

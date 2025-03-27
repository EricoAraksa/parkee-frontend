import React, { useState, useEffect } from "react";
import { Table, Container, Alert } from "react-bootstrap";

function ParkingStatus() {
  const [vehicles, setVehicles] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date()); // State for live time
  const hourlyRate = 3000; // IDR 3000 per hour

  useEffect(() => {
    fetch("http://localhost:8000/parking_status.php")
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error("Error fetching parking status:", error));

    // Update current time every second
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Cleanup interval on component unmount
  }, []);

  // Function to format time as "YYYY-MM-DD HH:mm:ss"
  const formatTime = (date) => {
    return date.toLocaleString("en-US", { 
      year: "numeric", 
      month: "2-digit", 
      day: "2-digit", 
      hour: "2-digit", 
      minute: "2-digit", 
      second: "2-digit", 
      hour12: false // Use 24-hour format
    }).replace(",", ""); // Remove comma for cleaner display
  };

  // Function to calculate the estimated fee
  const calculateFee = (checkInTime) => {
    const checkInDate = new Date(checkInTime);
    const durationHours = (currentTime - checkInDate) / (1000 * 60 * 60); // Convert ms to hours
    return Math.ceil(durationHours) * hourlyRate; // Round up to the nearest hour
  };

  return (
    <Container className="mt-5">
      <h2>Currently Parked Vehicles</h2>

      {/* Display Current Time */}
      <Alert variant="secondary" className="text-center">
        ⏰ <strong>Current Time:</strong> {formatTime(currentTime)}
      </Alert>

      {/* Tariff Rate Information */}
      <Alert variant="info" className="mb-4 text-center">
        🚗 Parking Rate: <strong>IDR {hourlyRate} per hour</strong>
      </Alert>

      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>#</th>
            <th>Plate Number</th>
            <th>Check-In Time</th>
            <th>Current Fee (IDR)</th> {/* New Column for Fee */}
          </tr>
        </thead>
        <tbody>
          {vehicles.length > 0 ? (
            vehicles.map((vehicle, index) => (
              <tr key={vehicle.plate_number}>
                <td>{index + 1}</td>
                <td>{vehicle.plate_number}</td>
                <td>{vehicle.check_in_time}</td>
                <td>{calculateFee(vehicle.check_in_time)}</td> {/* Display Estimated Fee */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No vehicles are currently parked.
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
}

export default ParkingStatus;

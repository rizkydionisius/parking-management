// src/App.js
import React, { useState } from 'react';
import ParkingMap from './components/ParkingMap';
import BookingForm from './components/BookingForm';
import BookingDetails from './components/BookingDetails';
import './App.css';

const App = () => {
  const [spots, setSpots] = useState([
    { id: 1, status: 'available' },
    { id: 2, status: 'occupied' },
    { id: 3, status: 'available' },
    { id: 4, status: 'occupied' },
    { id: 5, status: 'available' },
    { id: 6, status: 'available' },
    { id: 7, status: 'occupied' },
    { id: 8, status: 'available' },
  ]);

  const [selectedSpot, setSelectedSpot] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState('');

  const handleSpotClick = (id) => {
    setSpots((prevSpots) =>
      prevSpots.map((spot) =>
        spot.id === id
          ? { ...spot, status: spot.status === 'available' ? 'occupied' : 'available' }
          : spot
      )
    );
  };

  const handleSpotSelection = (spotId) => {
    setSelectedSpot(spotId);
    const spot = spots.find((spot) => spot.id === spotId);
    if (spot.status === 'occupied') {
      setErrorMessage('Tempat parkir sudah terisi');
    } else {
      setErrorMessage('');
    }
  };

  const handleFormSubmit = (customerName, vehicleNumber, bookingDuration) => {
    if (selectedSpot && spots.find((spot) => spot.id === selectedSpot).status === 'available') {
      setBookingSuccess(`Pemesanan berhasil untuk tempat parkir P${selectedSpot}`);
      setSpots((prevSpots) =>
        prevSpots.map((spot) =>
          spot.id === selectedSpot ? { ...spot, status: 'occupied' } : spot
        )
      );
    } else {
      setBookingSuccess('');
      setErrorMessage('Gagal memesan tempat parkir. Pastikan tempat parkir tersedia.');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">Sistem Parkiran</h1>

      <div className="row">
        {/* Kolom Peta Parkiran */}
        <div className="col-md-6">
          <ParkingMap spots={spots} onSpotClick={handleSpotClick} />
        </div>

        {/* Kolom Formulir Pemesanan */}
        <div className="col-md-6 form-container">
          <BookingForm
            spots={spots}
            onSpotSelection={handleSpotSelection}
            onFormSubmit={handleFormSubmit}
            selectedSpot={selectedSpot}
            errorMessage={errorMessage}
            bookingSuccess={bookingSuccess}
          />
        </div>
      </div>

      {/* Kolom Rincian Pemesanan */}
      <div className="row mt-4">
        <div className="col-md-12">
          <BookingDetails selectedSpot={selectedSpot} spots={spots} />
        </div>
      </div>
    </div>
  );
};

export default App;

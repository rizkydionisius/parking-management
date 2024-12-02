import React, { useState } from 'react';

const BookingForm = ({ spots, onSpotSelection, onFormSubmit, selectedSpot, errorMessage, bookingSuccess }) => {
  const [customerName, setCustomerName] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [bookingDuration, setBookingDuration] = useState('');

  // Fungsi untuk menangani pemilihan tempat parkir
  const handleSpotSelection = (e) => {
    const spotId = parseInt(e.target.value);
    onSpotSelection(spotId);
  };

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(customerName, vehicleNumber, bookingDuration);
  };

  return (
    <div>
      <h3>Formulir Pemesanan</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Nama:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicleNumber">Nomor Kendaraan:</label>
          <input
            type="text"
            id="vehicleNumber"
            className="form-control"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="spotSelection">Pilih Tempat Parkir:</label>
          <select
            id="spotSelection"
            className="form-control"
            value={selectedSpot || ''}
            onChange={handleSpotSelection}
            required
          >
            <option value="" disabled>
              Pilih Tempat Parkir
            </option>
            {spots.map((spot) => (
              <option key={spot.id} value={spot.id}>
                P{spot.id} {spot.status === 'occupied' ? '(Terisi)' : '(Tersedia)'}
              </option>
            ))}
          </select>
        </div>

        {errorMessage && <div className="alert alert-danger mt-2">{errorMessage}</div>}
        {bookingSuccess && <div className="alert alert-success mt-2">{bookingSuccess}</div>}

        <div className="form-group">
          <label htmlFor="bookingDuration">Durasi Parkir (jam):</label>
          <input
            type="number"
            id="bookingDuration"
            className="form-control"
            value={bookingDuration}
            onChange={(e) => setBookingDuration(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Pesan Tempat Parkir
        </button>
      </form>
    </div>
  );
};

export default BookingForm;

// src/components/BookingDetails.js
import React from 'react';

const BookingDetails = ({ selectedSpot, spots }) => {
  const spot = spots.find((spot) => spot.id === selectedSpot);

  if (!spot) {
    return <div>Pilih tempat parkir untuk melihat rincian pemesanan.</div>;
  }

  return (
    <div>
      <h3>Rincian Pemesanan</h3>
      <p><strong>Tempat Parkir:</strong> P{spot.id}</p>
      <p><strong>Status:</strong> {spot.status === 'available' ? 'Tersedia' : 'Terisi'}</p>
    </div>
  );
};

export default BookingDetails;

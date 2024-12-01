import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const ParkingMap = ({ spots, onSpotClick }) => {
  const gridSize = 3; // Jumlah tempat parkir per baris

  return (
    <div>
      <h2 className="text-center">Peta Parkiran</h2>
      <Stage width={window.innerWidth} height={400}>
        <Layer>
          {spots.map((spot, index) => {
            const row = Math.floor(index / gridSize); // Baris
            const col = index % gridSize; // Kolom

            return (
              <>
                <Rect
                  key={spot.id}
                  x={col * 100 + 50} // Spasi antar kolom
                  y={row * 120 + 50} // Spasi antar baris
                  width={80}
                  height={80}
                  fill={spot.status === 'available' ? 'green' : 'red'}
                  onClick={() => onSpotClick(spot.id)}
                  cornerRadius={10} // Sudut membulat
                  shadowBlur={5} // Tambahkan bayangan
                />
                <Text
                  x={col * 100 + 60}
                  y={row * 120 + 90}
                  text={`P${spot.id}`}
                  fontSize={18}
                  fill="white"
                />
              </>
            );
          })}
        </Layer>
      </Stage>
    </div>
  );
};

export default ParkingMap;

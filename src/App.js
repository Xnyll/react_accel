import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const gridSize = 20; // Define the grid size
  const totalCells = gridSize * gridSize;

  // State variables
  const [gridData, setGridData] = useState(Array(totalCells).fill('#FFFFFF')); // Initialize grid with white color for all cells
  const [motionValues, setMotionValues] = useState({ x: 0, y: 0 }); // State to store motion values

  useEffect(() => {
    // Effect to subscribe to device motion event
    const handleMotionEvent = (event) => {
      // Calculate grid cell based on device motion
      const x = Math.floor((event.accelerationIncludingGravity.x + 10) * (gridSize / 20)); // Scale x value to fit within the grid
      const y = Math.floor((event.accelerationIncludingGravity.y + 10) * (gridSize / 20)); // Scale y value to fit within the grid

      if (x >= 0 && x < gridSize && y >= 0 && y < gridSize) {
        // Update grid cell color
        const index = y * gridSize + x;
        const newGridData = gridData.map((cellColor, i) => {
          return i === index ? getRandomColor() : cellColor;
        });
        setGridData(newGridData);
      }

      // Update motion values
      setMotionValues({ x, y });
    };

    // Add event listener for device motion
    window.addEventListener('devicemotion', handleMotionEvent);

    // Clean up: remove event listener when component unmounts
    return () => {
      window.removeEventListener('devicemotion', handleMotionEvent);
    };
  }, []); // Empty dependency array as we only want this effect to run once after initial render

  // Function to generate a random color
  const getRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  // Function to request device motion permission
  const requestDevicePermission = () => {
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
      DeviceMotionEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === 'granted') {
            console.log('Device motion permission granted.');
          } else {
            console.log('Device motion permission denied.');
          }
        })
        .catch(console.error);
    } else {
      console.log('Device motion API not supported.');
    }
  };

  // Render component
  return (
    <div className="App">
      <div>
        <p>X: {motionValues.x}, Y: {motionValues.y}</p> {/* Display current motion values */}
      </div>
      <button onClick={requestDevicePermission}>Request Device Motion Permission</button> {/* Button to request permission */}
      {/* Grid container */}
      <div className="grid-container" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {gridData.map((cellColor, index) => (
          <div key={index} className="cell" style={{ backgroundColor: cellColor }}></div>
        ))} 
      </div>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import './Headervisuals.css';

const Headervisuals = ({ onNewArray, onSortingAlgo }) => {
  const [sortingAlgo, setSortingAlgo] = useState("");

  const handleSortingAlgo = (algo) => {
    setSortingAlgo(algo);
    onSortingAlgo(algo); // Pass the selected algorithm to the parent component
  };

  return (
    <div className="header-container">
      <button onClick={onNewArray}>New Array</button>
      <button onClick={() => handleSortingAlgo('bs')}>Bubble Sort</button>
      <button onClick={() => handleSortingAlgo('ms')}>Merge Sort</button>
      <button onClick={() => handleSortingAlgo('qs')}>Quick Sort</button>
      <button onClick={() => handleSortingAlgo('is')}>Insertion Sort</button>
      <button onClick={() => handleSortingAlgo('ss')}>Selection Sort</button>
      <p>Selected Algorithm: {sortingAlgo}</p>
    </div>
  );
};

export default Headervisuals;
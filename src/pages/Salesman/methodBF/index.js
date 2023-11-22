import React, { useState, useEffect } from 'react';

// New component for detailed solution
const DetailedSolution = ({ cityNames, distanceMatrix, bestPath }) => {
  return (
    <div>
      <h2>Detailed Solution:</h2>
      <table>
        <thead>
          <tr>
            <th>Step</th>
            <th>Path</th>
            <th>Distance</th>
          </tr>
        </thead>
        <tbody>
          {bestPath.map((step, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{bestPath.slice(0, index + 1).map((i) => cityNames[i]).join(' -> ')}</td>
              <td>{index === bestPath.length - 1 ? 'Total Distance' : distanceMatrix[step][bestPath[index + 1]]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BruteForceTSP = () => {
  const [cityNames, setCityNames] = useState([]);
  const [distanceMatrix, setDistanceMatrix] = useState([]);
  const [newCity, setNewCity] = useState('');
  const [newDistance, setNewDistance] = useState('');
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [bestPath, setBestPath] = useState([]);
  const [bestDistance, setBestDistance] = useState(Number.MAX_VALUE);
  const [isVisible, setIsVisible] = useState(false);
  const [detailedSolutionVisible, setDetailedSolutionVisible] = useState(false);

  useEffect(() => {
    setDetailedSolutionVisible(true);
  }, [bestPath]);

  const addCity = () => {
    if (newCity) {
      setCityNames([...cityNames, newCity]);
      setDistanceMatrix((prevMatrix) => {
        const newRow = new Array(cityNames.length + 1).fill(0);
        return [...prevMatrix, newRow];
      });
      setNewCity('');
    }
  };

  const addDistance = () => {
    if (!isNaN(newDistance)) {
      const updatedMatrix = [...distanceMatrix];
      updatedMatrix[row][column] = parseInt(newDistance);
      updatedMatrix[column][row] = parseInt(newDistance);
      setDistanceMatrix(updatedMatrix);
      setNewDistance('');
    }
  };

  const calculateDistance = (path, matrix) => {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      distance += matrix[path[i]][path[i + 1]];
    }
    distance += matrix[path[path.length - 1]][path[0]]; // Return to the starting city
    return distance;
  };

  const calculateLowerBound = (path, matrix) => {
    let H = 0;

    for (const step of path) {
      let localLowerBound = H;

      for (let i = 0; i < matrix.length; i++) {
        if (!path.includes(i)) {
          const row = matrix[i].filter((_, j) => !path.includes(j));
          localLowerBound += Math.min(...row);
        }
      }

      for (let j = 0; j < matrix[0].length; j++) {
        if (!path.includes(j)) {
          const column = matrix.map((row) => row[j]).filter((_, i) => !path.includes(i));
          localLowerBound += Math.min(...column);
        }
      }

      H = localLowerBound;
    }

    setIsVisible(!isVisible);

    return H;
  };

  const calculatePath = (path, matrix, lowerBound) => {
    if (path.length === cityNames.length) {
      const distance = calculateDistance(path, matrix);
      if (distance < bestDistance) {
        setBestPath(path);
        setBestDistance(distance);
      }
    } else {
      for (let i = 0; i < cityNames.length; i++) {
        if (!path.includes(i)) {
          const newPath = [...path, i];
          const newLowerBound = calculateLowerBound(newPath, matrix);
          if (newLowerBound < bestDistance) {
            calculatePath(newPath, matrix, newLowerBound);
          }
        }
      }
    }
  };

  const startPath = [0];

  const calculateBruteForce = () => {
    calculatePath(startPath, distanceMatrix, calculateLowerBound(startPath, distanceMatrix));
  };

  return (
    <div>
      <div>
        <h3>Добавить город:</h3>
        <input
          type='text'
          placeholder='Название города'
          value={newCity}
          onChange={(e) => setNewCity(e.target.value)}
        />
        <button onClick={addCity}>Добавить</button>
      </div>
      <div>
        <h3>Добавить расстояние:</h3>
        <select onChange={(e) => setRow(parseInt(e.target.value))}>
          {cityNames.map((city, index) => (
            <option key={index} value={index}>
              {city}
            </option>
          ))}
        </select>
        <select onChange={(e) => setColumn(parseInt(e.target.value))}>
          {cityNames.map((city, index) => (
            <option key={index} value={index}>
              {city}
            </option>
          ))}
        </select>
        <input
          type='number'
          placeholder='Расстояние'
          value={newDistance}
          onChange={(e) => setNewDistance(e.target.value)}
        />
        <button onClick={addDistance}>Добавить расстояние</button>
      </div>
      <div>
        <button onClick={calculateBruteForce}>
          Рассчитать (Метод грубої сили)
        </button>
      </div>
      {detailedSolutionVisible && <DetailedSolution cityNames={cityNames} distanceMatrix={distanceMatrix} bestPath={bestPath} />}
      <div>
        <h3>Матрица расстояний:</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              {cityNames.map((city, index) => (
                <th key={index}>{city}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cityNames.map((city, rowIndex) => (
              <tr key={rowIndex}>
                <th>{city}</th>
                {cityNames.map((_, colIndex) => (
                  <td key={colIndex}>{distanceMatrix[rowIndex][colIndex]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isVisible && (
        <>
          <h2>
            Лучший путь:{' '}
            {bestPath.map((index) => cityNames[index]).join(' -> ')}
          </h2>
          <h2>Лучшее расстояние: {bestDistance}</h2>
        </>
      )}
    </div>
  );
};

export default BruteForceTSP;

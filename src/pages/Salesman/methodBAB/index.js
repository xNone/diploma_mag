import React, { useState } from 'react';

const TravelingSalesman = () => {
  const [cityNames, setCityNames] = useState([]);
  const [distanceMatrix, setDistanceMatrix] = useState([]);
  const [newCity, setNewCity] = useState('');
  const [newDistance, setNewDistance] = useState('');
  const [row, setRow] = useState(0);
  const [column, setColumn] = useState(0);
  const [bestPath, setBestPath] = useState([]);
  const [bestDistance, setBestDistance] = useState(Number.MAX_VALUE);
  const [isVisible, setIsVisible] = useState(false);
  const [solutionSteps, setSolutionSteps] = useState([]);

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

  const calculateDistance = (path, matrix) => {
    let distance = 0;
    for (let i = 0; i < path.length - 1; i++) {
      distance += matrix[path[i]][path[i + 1]];
    }
    distance += matrix[path[path.length - 1]][path[0]];
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

    setIsVisible(true);

    return H;
  };

  const startPath = [0];

  const handleCalculate = () => {
    const initialLowerBound = calculateLowerBound(startPath, distanceMatrix);
    calculatePath(startPath, distanceMatrix, initialLowerBound);
  };

  const handleShowSteps = () => {
    const steps = [];
    const initialLowerBound = calculateLowerBound(startPath, distanceMatrix);
    calculatePathWithSteps(startPath, distanceMatrix, initialLowerBound, steps);
    setSolutionSteps(steps);
  };

  const calculatePathWithSteps = (path, matrix, lowerBound, steps) => {
    if (path.length === cityNames.length) {
      const distance = calculateDistance(path, matrix);
      if (distance < bestDistance) {
        setBestPath(path);
        setBestDistance(distance);
      }
      steps.push({ path: [...path], distance });
    } else {
      for (let i = 0; i < cityNames.length; i++) {
        if (!path.includes(i)) {
          const newPath = [...path, i];
          const newLowerBound = calculateLowerBound(newPath, matrix);
          if (newLowerBound < bestDistance) {
            calculatePathWithSteps(newPath, matrix, newLowerBound, steps);
          }
        }
      }
    }
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
        <button onClick={handleCalculate}>Рассчитать</button>
        <button onClick={handleShowSteps}>Показать шаги</button>
      </div>
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
      {solutionSteps.length > 0 && (
        <div>
          <h3>Шаги решения:</h3>
          <ol>
            {solutionSteps.map((step, index) => (
              <li key={index}>
                <p>
                  Путь: {step.path.map((index) => cityNames[index]).join(' -> ')}
                </p>
                <p>Расстояние: {step.distance}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default TravelingSalesman;

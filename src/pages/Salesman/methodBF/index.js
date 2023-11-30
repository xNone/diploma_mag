import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const DetailedSolution = ({ cityNames, distanceMatrix, bestPath }) => {
  const { t } = useTranslation();
  return (
    <div className='stepDist-div'>
      <h2>{t('Detailed Solution:')}</h2>
      <table>
        <thead>
          <tr>
            <th>{t('Step')}</th>
            <th>{t('Path')}</th>
            <th>{t('Distance')}</th>
          </tr>
        </thead>
        <tbody>
          {bestPath.map((step, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>
                {bestPath
                  .slice(0, index + 1)
                  .map((i) => cityNames[i])
                  .join(' -> ')}
              </td>
              <td>
                {index === bestPath.length - 1
                  ? `${t('Total Distance')}`
                  : distanceMatrix[step][bestPath[index + 1]]}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BruteForceTSP = ({ onDataUpdate }) => {
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
  const [selectedSize, setSelectedSize] = useState('Manual'); // Default size is Manual
  const { t } = useTranslation();
  const [dpExecutionTime, setDPExecutionTime] = useState(0);
  const [dpIterations, setDPIterations] = useState(0);
  const [memoryUsed, setMemoryUsed] = useState(0);
  const [startMemory, setStartMemory] = useState(0);

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

  const handleSizeChange = (e) => {
    const size = e.target.value;
    setSelectedSize(size);

    // Set cityNames and distanceMatrix based on the selected size
    if (size === 'Manual') {
      setCityNames([]);
      setDistanceMatrix([]);
    } else if (size === 'Small') {
      setCityNames(['A', 'B', 'C']);
      setDistanceMatrix([
        [0, 1, 4],
        [1, 0, 2],
        [4, 2, 0],
      ]);
    } else if (size === 'Medium') {
      // Set Medium size data
    } else if (size === 'Large') {
      // Set Large size data
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
    const startTime = performance.now();
    let iterationsCount = 0;

    for (const step of path) {
      let localLowerBound = H;
      iterationsCount++;
      for (let i = 0; i < matrix.length; i++) {
        if (!path.includes(i)) {
          const row = matrix[i].filter((_, j) => !path.includes(j));
          localLowerBound += Math.min(...row);
        }
      }

      for (let j = 0; j < matrix[0].length; j++) {
        if (!path.includes(j)) {
          const column = matrix
            .map((row) => row[j])
            .filter((_, i) => !path.includes(i));
          localLowerBound += Math.min(...column);
        }
      }

      H = localLowerBound;
    }

    setIsVisible(!isVisible);

    const endTime = performance.now();
    setDPExecutionTime(endTime - startTime);
    setDPIterations(iterationsCount);

    const endMemory = window.performance.memory.usedJSHeapSize;

    const memoryUsed = (endMemory - startMemory) / (1024 * 1024);

    setMemoryUsed(memoryUsed);

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
    setStartMemory(window.performance.memory.usedJSHeapSize);

    calculatePath(
      startPath,
      distanceMatrix,
      calculateLowerBound(startPath, distanceMatrix)
    );
    setDetailedSolutionVisible(true);
  };

  const handClick = () => {
    onDataUpdate(dpExecutionTime, dpIterations, memoryUsed);
  };

  return (
    <div>
      <div className='type-enter-div'>
        <h2>{t('Select the data:')}</h2>
        <select onChange={handleSizeChange} value={selectedSize}>
          <option value='Manual'>{t('Manual Entry')}</option>
          <option value='Small'>{t('Small')}</option>
          <option value='Medium'>{t('Medium')}</option>
          <option value='Large'>{t('Large')}</option>
        </select>
      </div>
      <div className='main-city-div'>
        <div className='city-div'>
          <h2>{t('Add city:')}</h2>
          <input
            type='text'
            placeholder={t('City name')}
            value={newCity}
            onChange={(e) => setNewCity(e.target.value)}
          />
          <button onClick={addCity}>{t('Add')}</button>
        </div>
        <div className='distance-div'>
          <h2>{t('Add distance:')}</h2>
          <div>
            <span for='from'> {t('From-label')} </span>
            <select
              id='from'
              onChange={(e) => setRow(parseInt(e.target.value))}
            >
              {cityNames.map((city, index) => (
                <option key={index} value={index}>
                  {city}
                </option>
              ))}
            </select>
            <label for='before'> {t('Before-label')} </label>
            <select
              id='before'
              onChange={(e) => setColumn(parseInt(e.target.value))}
            >
              {cityNames.map((city, index) => (
                <option key={index} value={index}>
                  {city}
                </option>
              ))}
            </select>
            <input
              type='number'
              placeholder={t('Distance')}
              value={newDistance}
              onChange={(e) => setNewDistance(e.target.value)}
            />
          </div>
          <button onClick={addDistance}>{t('Add distance:')}</button>
        </div>
      </div>
      <div className='res-div'>
        <div className='button-res'>
          <button onClick={calculateBruteForce}>{t('Result')}</button>
          <button onClick={handClick}>{t('Compare')}</button>
        </div>
        <ul className='circles'>
          {[...Array(10)].map((_, index) => (
            <li key={index}></li>
          ))}
        </ul>
        <div className='matrix-div'>
          <h2>{t('Distance Matrix:')}</h2>
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
      </div>
      {detailedSolutionVisible && (
        <DetailedSolution
          cityNames={cityNames}
          distanceMatrix={distanceMatrix}
          bestPath={bestPath}
        />
      )}
      {isVisible && (
        <div className='bestDist-div'>
          <h2>{t('Solution')}:</h2>
          <h2>
            <span>{t('A better way:')}</span>{' '}
            {bestPath.map((index) => cityNames[index]).join(' -> ')}
          </h2>
          <h2>
            <span>{t('Best distance:')}</span> {bestDistance}
          </h2>
        </div>
      )}
      <div>
        <div>
          {t('Execution time')}: {dpExecutionTime.toFixed(10)} ms
        </div>
        <div>
          {t('Number of iterations')}: {dpIterations}
        </div>
        <div>
          {t('Memory used')}: {memoryUsed.toFixed(4)} MB
        </div>
      </div>
    </div>
  );
};

export default BruteForceTSP;

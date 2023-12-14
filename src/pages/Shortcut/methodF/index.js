import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

function floydWarshall(graph) {
  const V = graph.length;
  let dist = [];
  let next = [];

  // Initialize dist and next matrices
  for (let i = 0; i < V; i++) {
    dist[i] = [];
    next[i] = [];
    for (let j = 0; j < V; j++) {
      dist[i][j] = graph[i][j];
      if (i !== j && graph[i][j] < Infinity) {
        next[i][j] = j;
      } else {
        next[i][j] = null;
      }
    }
  }

  // Floyd-Warshall algorithm
  for (let k = 0; k < V; k++) {
    for (let i = 0; i < V; i++) {
      for (let j = 0; j < V; j++) {
        if (dist[i][j] > dist[i][k] + dist[k][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
          next[i][j] = next[i][k];
        }
      }
    }
  }

  return { dist, next };
}

function reconstructPath(u, v, next) {
  if (next[u][v] === null) {
    return [];
  }

  let pathArray = [u];
  while (u !== v) {
    u = next[u][v];
    pathArray.push(u);
  }

  return pathArray;
}

function FloydWarshallVisualizer() {
  const [customSize, setCustomSize] = useState(4);
  const [matrixSize, setMatrixSize] = useState('Custom');
  const [matrixData, setMatrixData] = useState([
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
    ['', '', '', ''],
  ]);
  const [startVertex, setStartVertex] = useState(0);
  const [endVertex, setEndVertex] = useState(7);
  const [shortestPath, setShortestPath] = useState([]);
  const [dist, setDist] = useState([]);
  const { t } = useTranslation();

  const predefinedMatrices = {
    Small: [
      [0, Infinity, -2, Infinity],
      [4, 0, 3, Infinity],
      [Infinity, Infinity, 0, 2],
      [Infinity, -1, Infinity, 0],
    ],
    Medium: [
      [0, 2, Infinity, 3, 1, Infinity, Infinity, 10],
      [2, 0, 4, Infinity, Infinity, Infinity, Infinity, Infinity],
      [Infinity, 4, 0, Infinity, Infinity, Infinity, Infinity, 3],
      [3, Infinity, Infinity, 0, Infinity, Infinity, Infinity, 8],
      [1, Infinity, Infinity, Infinity, 0, 2, Infinity, Infinity],
      [Infinity, Infinity, Infinity, Infinity, 2, 0, 3, Infinity],
      [Infinity, Infinity, Infinity, Infinity, Infinity, 3, 0, 1],
      [10, Infinity, 3, 8, Infinity, Infinity, 1, 0],
    ],
    Large: [
      [
        0,
        3,
        Infinity,
        7,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
      ],
      [
        8,
        0,
        2,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
      ],
      [
        5,
        Infinity,
        0,
        1,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
      ],
      [
        2,
        Infinity,
        Infinity,
        0,
        4,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
      ],
      [
        Infinity,
        Infinity,
        Infinity,
        6,
        0,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
      ],
      [
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        0,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
      ],
      [
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        0,
        9,
        Infinity,
        Infinity,
      ],
      [
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        8,
        0,
        6,
        Infinity,
      ],
      [
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        0,
        1,
      ],
      [
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        Infinity,
        0,
      ],
    ],
  };

  const handleMatrixSizeChange = (e) => {
    const size = e.target.value;
    setMatrixSize(size);

    if (size === 'Custom') {
      const newSize = customSize || 4;
      setCustomSize(newSize);

      const newMatrix = new Array(newSize)
        .fill(0)
        .map(() => new Array(newSize).fill(Infinity));
      setMatrixData(newMatrix);
    } else {
      const newMatrix = predefinedMatrices[size];
      setCustomSize(newMatrix.length);
      setMatrixData(newMatrix);
    }
  };

  const handleCustomSizeChange = (e) => {
    const size = parseInt(e.target.value, 10);
    setCustomSize(size);
    console.log('e.target.value', e.target.value);
    const newMatrix = new Array(size)
      .fill(0)
      .map(() => new Array(size).fill(Infinity));
    setMatrixData(newMatrix);
  };

  const handleMatrixValueChange = (i, j, e) => {
    const value = parseInt(e.target.value, 10);
    const newData = [...matrixData];
    newData[i][j] = value;
    setMatrixData(newData);
  };

  const findShortestPath = () => {
    const { dist, next } = floydWarshall(matrixData);
    setDist(dist);

    const path = reconstructPath(startVertex, endVertex, next);
    setShortestPath(path);
  };

  return (
    <div>
      <div className='div-size-matrix'>
        <h2>{t('Select a matrix')}</h2>
        <select value={matrixSize} onChange={handleMatrixSizeChange}>
          <option value='Custom'>Custom</option>
          <option value='Small'>Small</option>
          <option value='Medium'>Medium</option>
          <option value='Large'>Large</option>
        </select>
        <div className='size-matrix'>
          {matrixSize === 'Custom' && (
            <label>
              {t('Matrix size')}
              <input
                type='number'
                value={customSize}
                onChange={handleCustomSizeChange}
                min='2'
              />
            </label>
          )}
          <div className='size-matrix-div'>
            <label>{t('Start Vertex:')}</label>
            <input
              type='number'
              value={startVertex}
              onChange={(e) => setStartVertex(Number(e.target.value))}
            />
            <label>{t('End Vertex:')}</label>
            <input
              type='number'
              value={endVertex}
              onChange={(e) => setEndVertex(Number(e.target.value))}
            />
          </div>
        </div>
      </div>
      <div className='table-matrix'>
        <h2>{t('Enter the matrix of weights of the edges:')}</h2>
        <table>
          <tbody>
            {matrixData.map((row, i) => (
              <tr key={i}>
                {row.map((value, j) => (
                  <td key={j}>
                    <input
                      type='number'
                      value={value === Infinity ? '' : value}
                      onChange={(e) => handleMatrixValueChange(i, j, e)}
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={findShortestPath}>{t('Result')}</button>
      </div>
      <div>
        {dist &&
          dist[startVertex] &&
          dist[startVertex][endVertex] !== undefined && (
            <h2 className='h2-style'>
              {t('Shortest distance from')} <span>{startVertex}</span> {t('to')}{' '}
              <span>{endVertex}</span>
            </h2>
          )}
        {shortestPath.length > 0 && (
          <div>
            <h2 className='h2-style'>{t('Shortest path:')}</h2>
            {shortestPath.join(' -> ')}
          </div>
        )}
      </div>
    </div>
  );
}

export default FloydWarshallVisualizer;

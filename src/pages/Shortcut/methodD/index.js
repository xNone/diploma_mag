import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const matrixData = {
  Small: [
    [0, 2, Infinity, 3, 1, Infinity, Infinity, 10],
    [2, 0, 4, Infinity, Infinity, Infinity, Infinity, Infinity],
    [Infinity, 4, 0, Infinity, Infinity, Infinity, Infinity, 3],
    [3, Infinity, Infinity, 0, Infinity, Infinity, Infinity, 8],
    [1, Infinity, Infinity, Infinity, 0, 2, Infinity, Infinity],
    [Infinity, Infinity, Infinity, Infinity, 2, 0, 3, Infinity],
    [Infinity, Infinity, Infinity, Infinity, Infinity, 3, 0, 1],
    [10, Infinity, 3, 8, Infinity, Infinity, 1, 0],
  ],
  Medium: [
    [0, Infinity, -2, Infinity],
    [4, 0, 3, Infinity],
    [Infinity, Infinity, 0, 2],
    [Infinity, -1, Infinity, 0],
  ],
  Large: [
    [0, 7, 9, Infinity, Infinity, 14],
    [7, 0, 10, 15, Infinity, Infinity],
    [9, 10, 0, 11, Infinity, 2],
    [Infinity, 15, 11, 0, 6, Infinity],
    [Infinity, Infinity, Infinity, 6, 0, 9],
    [14, Infinity, 2, Infinity, 9, 0],
  ],
};

function DijkstraAlgorithm() {
  const [matrixSize, setMatrixSize] = useState(3); // Default size
  const [selectedExample, setSelectedExample] = useState('Custom');
  const [startNode, setStartNode] = useState(0);
  const [graph, setGraph] = useState([]);
  const [shortestDistances, setShortestDistances] = useState([]);
  const { t } = useTranslation();
  const [visTalbe, setvisTalbe] = useState(true);

  useEffect(() => {
    if (selectedExample === 'Custom') {
      // Initialize the graph with an empty matrix for custom input
      const customGraph = Array.from({ length: matrixSize }, () =>
        Array(matrixSize).fill(Infinity)
      );
      setGraph(customGraph);
      setvisTalbe(true);
    } else {
      // Use the selected example from matrixData
      setGraph(matrixData[selectedExample]);
      setvisTalbe(false);
    }
  }, [selectedExample, matrixSize]);

  const handleSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setMatrixSize(newSize);
  };

  const handleExampleChange = (e) => {
    const newExample = e.target.value;
    setSelectedExample(newExample);
  };

  const handleStartNodeChange = (e) => {
    const newStartNode = parseInt(e.target.value, 10);
    setStartNode(newStartNode);
  };

  const handleMatrixValueChange = (row, col, e) => {
    const newValue = parseInt(e.target.value, 10);
    const newGraph = [...graph];
    newGraph[row][col] = newValue;
    setGraph(newGraph);
  };

  const handleSolve = () => {
    // Solve using Dijkstra's algorithm and set the results in state
    const distances = dijkstra(graph, startNode);
    setShortestDistances(distances);
  };

  return (
    <div>
      <div className='div-size-matrix'>
        <h2>{t('Select a matrix')}</h2>
        <label>
          <select value={selectedExample} onChange={handleExampleChange}>
            <option value='Custom'>Custom</option>
            <option value='Small'>Small</option>
            <option value='Medium'>Medium</option>
            <option value='Large'>Large</option>
          </select>
        </label>
        <div className='size-matrix'>
          {visTalbe && (
            <label>
              {t('Matrix size')}
              <input
                type='number'
                min='1'
                value={matrixSize}
                onChange={handleSizeChange}
              />
            </label>
          )}
          <div className='size-matrix-div'>
            <label>
              Start Node:
              <input
                type='number'
                value={startNode}
                onChange={handleStartNodeChange}
              />
            </label>
          </div>
        </div>
      </div>
      <div className='table-matrix'>
        <h2>{t('Enter the matrix of weights of the edges:')}</h2>
        <table>
          <tbody>
            {graph.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((value, colIndex) => (
                  <td key={colIndex}>
                    <input
                      type='number'
                      value={value === Infinity ? '' : value}
                      onChange={(e) =>
                        handleMatrixValueChange(rowIndex, colIndex, e)
                      }
                    />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handleSolve}>{t('Result')}</button>
      </div>
      {shortestDistances.length > 0 && (
        <div className='node-div'>
          <h2 className='h2-style'>
            {t('Shortest distance from')} <span>{startNode}</span>
          </h2>
          <ul>
            {shortestDistances.map((distance, index) => (
              <li key={index}>
                <span>{`${t('Node')} ${index}:`}</span>{' '}
                <span>{`${distance}`}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function dijkstra(graph, startNode) {
  const numNodes = graph.length;
  const distances = new Array(numNodes).fill(Infinity);
  const visited = new Array(numNodes).fill(false);

  distances[startNode] = 0;

  for (let i = 0; i < numNodes - 1; i++) {
    const minDistanceNode = findMinDistanceNode(distances, visited);
    visited[minDistanceNode] = true;

    for (let j = 0; j < numNodes; j++) {
      if (!visited[j] && graph[minDistanceNode][j] !== Infinity) {
        const currentDistance =
          distances[minDistanceNode] + graph[minDistanceNode][j];
        if (currentDistance < distances[j]) {
          distances[j] = currentDistance;
        }
      }
    }
  }

  return distances;
}

function findMinDistanceNode(distances, visited) {
  let minDistance = Infinity;
  let minDistanceNode = -1;

  for (let i = 0; i < distances.length; i++) {
    if (!visited[i] && distances[i] < minDistance) {
      minDistance = distances[i];
      minDistanceNode = i;
    }
  }

  return minDistanceNode;
}

export default DijkstraAlgorithm;

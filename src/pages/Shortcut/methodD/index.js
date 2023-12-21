import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const matrixData = {
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

function DijkstraAlgorithm({onDataUpdate}) {
  const [matrixSize, setMatrixSize] = useState(3); // Default size
  const [selectedExample, setSelectedExample] = useState('Custom');
  const [startNode, setStartNode] = useState(0);
  const [graph, setGraph] = useState([]);
  const [shortestDistances, setShortestDistances] = useState([]);
  const { t } = useTranslation();
  const [visTalbe, setvisTalbe] = useState(true);
  const [dpExecutionTime, setDPExecutionTime] = useState(0);
  const [dpIterations, setDPIterations] = useState(0);
  const [memoryUsed, setMemoryUsed] = useState(0);
  const [startMemory, setStartMemory] = useState(0);
  const [isCompareVisible, setIsCompareVisible] = useState(false);

  function dijkstra(graph, startNode) {
    const numNodes = graph.length;
    const distances = new Array(numNodes).fill(Infinity);
    const visited = new Array(numNodes).fill(false);
    const startTime = performance.now();
    let iterationsCount = 0;

    distances[startNode] = 0;

    for (let i = 0; i < numNodes - 1; i++) {
      const minDistanceNode = findMinDistanceNode(distances, visited);
      visited[minDistanceNode] = true;
      iterationsCount++;
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

    const endTime = performance.now();
    setDPExecutionTime(endTime - startTime);
    setDPIterations(iterationsCount);

    const endMemory = window.performance.memory.usedJSHeapSize;

    const memoryUsed = (endMemory - startMemory) / (1024 * 1024);

    setMemoryUsed(memoryUsed);
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
    setStartMemory(window.performance.memory.usedJSHeapSize);
    // Solve using Dijkstra's algorithm and set the results in state
    const distances = dijkstra(graph, startNode);
    setShortestDistances(distances);
  };

  const handClick = () => {
    onDataUpdate(dpExecutionTime, dpIterations, memoryUsed);
    setIsCompareVisible(true);
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
        <button onClick={handClick}>{t('Compare')}</button>
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
      {isCompareVisible && (
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
      )}
    </div>
  );
}
export default DijkstraAlgorithm;

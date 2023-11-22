import React, { useState } from 'react';

const HungarianMethod = () => {
  const [numWorkers, setNumWorkers] = useState(3);
  const [numTasks, setNumTasks] = useState(3);
  const [costMatrix, setCostMatrix] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0))
  );

  const [assignment, setAssignment] = useState([]);
  const [isSolutionVisible, setIsSolutionVisible] = useState(false);

  const handleNumWorkersChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumWorkers(isNaN(value) ? 0 : value);
  };

  const handleNumTasksChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumTasks(isNaN(value) ? 0 : value);
  };

  const updateCostMatrix = () => {
    setCostMatrix(
      Array.from({ length: numWorkers }, () =>
        Array.from({ length: numTasks }, () => 0)
      )
    );
  };

  const handleBuildMatrix = () => {
    updateCostMatrix();
    setIsSolutionVisible(false);
  };

  const handleCostChange = (row, col, value) => {
    const newMatrix = [...costMatrix];
    newMatrix[row][col] = isNaN(value) ? 0 : parseInt(value, 10);
    setCostMatrix(newMatrix);
  };

  const findNearestNeighborSolution = () => {
    const unassignedTasks = Array.from({ length: numTasks }, (_, i) => i);
    const solution = [];

    for (let worker = 0; worker < numWorkers; worker++) {
      let minCost = Number.MAX_VALUE;
      let nearestTask = -1;

      for (let i = 0; i < unassignedTasks.length; i++) {
        const task = unassignedTasks[i];
        const cost = costMatrix[worker][task];

        if (cost < minCost) {
          minCost = cost;
          nearestTask = task;
        }
      }

      solution.push({
        worker: worker,
        task: nearestTask,
      });

      unassignedTasks.splice(unassignedTasks.indexOf(nearestTask), 1);
    }

    setAssignment(solution);
    setIsSolutionVisible(true);
  };

  return (
    <div>
      <h3>Метод ближайшего соседа для задачи о призначении</h3>
      <div>
        <label>Количество работников:</label>
        <input
          type='number'
          value={numWorkers}
          onChange={handleNumWorkersChange}
        />
      </div>
      <div>
        <label>Количество задач:</label>
        <input type='number' value={numTasks} onChange={handleNumTasksChange} />
      </div>
      <div>
        <button onClick={handleBuildMatrix}>Построить Матрицу стоимости</button>
      </div>
      {costMatrix.length > 0 && (
        <div>
          <h3>Матрица стоимостей:</h3>
          <table>
            <thead>
              <tr>
                <th></th>
                {[...Array(numTasks)].map((_, j) => (
                  <th key={j}>Задача {j + 1}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {costMatrix.map((row, i) => (
                <tr key={i}>
                  <td>Работник {i + 1}</td>
                  {row.map((cost, j) => (
                    <td key={j}>
                      <input
                        type='number'
                        value={cost}
                        onChange={(e) => handleCostChange(i, j, e.target.value)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            <button onClick={findNearestNeighborSolution}>Найти решение</button>
          </div>
          {isSolutionVisible && (
            <div>
              <h3>Оптимальное назначение:</h3>
              <ul>
                {assignment.map((assignment, i) => (
                  <li key={i}>
                    Работник {assignment.worker + 1} призначен на Задачу{' '}
                    {assignment.task + 1}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HungarianMethod;

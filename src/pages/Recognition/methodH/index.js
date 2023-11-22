import React, { useState } from 'react';

const HungarianMethodAssignment = () => {
  const [numJobs, setNumJobs] = useState(3);
  const [numWorkers, setNumWorkers] = useState(3);
  const [costMatrix, setCostMatrix] = useState(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => 0))
  );

  const [assignment, setAssignment] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [steps, setSteps] = useState([]);

  const handleNumJobsChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumJobs(isNaN(value) ? 0 : value);
  };

  const handleNumWorkersChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setNumWorkers(isNaN(value) ? 0 : value);
  };

  const updateCostMatrix = () => {
    const newMatrix = Array.from({ length: numJobs }, () =>
      Array.from({ length: numWorkers }, () => 0)
    );
    setCostMatrix(newMatrix);
  };

  const handleBuildMatrix = () => {
    updateCostMatrix();
    setIsVisible(true);
  };

  const handleCostChange = (row, col, value) => {
    const newMatrix = [...costMatrix];
    newMatrix[row][col] = isNaN(value) ? 0 : parseInt(value, 10);
    setCostMatrix(newMatrix);
  };

  const findAssignment = () => {
    const rows = costMatrix.length;
    const cols = costMatrix[0].length;

    // Create a copy of the cost matrix to work with
    const matrix = costMatrix.map(row => [...row]);

    const steps = [];
    const addStep = (stepMatrix, description) => {
      steps.push({ matrix: stepMatrix.map(row => [...row]), description });
    };

    // Step 1: Reduce rows
    for (let i = 0; i < rows; i++) {
      const minInRow = Math.min(...matrix[i]);
      matrix[i] = matrix[i].map(cost => cost - minInRow);
    }
    addStep(matrix, 'Шаг 1: Вычесть минимальный элемент в каждой строке матрицы');

    // Step 2: Reduce columns
    for (let j = 0; j < cols; j++) {
      const column = matrix.map(row => row[j]);
      const minInColumn = Math.min(...column);
      for (let i = 0; i < rows; i++) {
        matrix[i][j] -= minInColumn;
      }
    }
    addStep(matrix, 'Шаг 2: Вычесть минимальный элемент в каждом столбце полученной матрицы');

    // Step 3: Cover zeros with minimum number of lines
    const coveredRows = new Array(rows).fill(false);
    const coveredCols = new Array(cols).fill(false);
    let numLines = 0;

    while (numLines < rows) {
      const zeros = [];
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (matrix[i][j] === 0 && !coveredRows[i] && !coveredCols[j]) {
            zeros.push({ row: i, col: j });
          }
        }
      }

      if (zeros.length === 0) {
        break;
      }

      const { row, col } = zeros[0];
      if (!coveredRows[row]) {
        coveredRows[row] = true;
        numLines++;
      }
      if (!coveredCols[col]) {
        coveredCols[col] = true;
        numLines++;
      }

      // Remove other zeros in the same row or column
      for (let i = 0; i < rows; i++) {
        if (matrix[i][col] === 0 && i !== row) {
          coveredRows[i] = true;
          numLines++;
        }
      }
      for (let j = 0; j < cols; j++) {
        if (matrix[row][j] === 0 && j !== col) {
          coveredCols[j] = true;
          numLines++;
        }
      }

      addStep(matrix, 'Шаг 3: Покрыть нули минимальным числом горизонтальных и вертикальных линий');
    }

    // Step 4: Find minimum number of lines to cover all zeros
    const minLines = Math.min(rows, cols) - numLines;
    addStep(matrix, 'Шаг 4: Найти минимальное число линий для покрытия всех нулей');

    if (minLines < Math.min(rows, cols)) {
      // Additional lines are needed for full coverage
      const uncoveredRows = [];
      const uncoveredCols = [];

      for (let i = 0; i < rows; i++) {
        if (!coveredRows[i]) {
          uncoveredRows.push(i);
        }
      }

      for (let j = 0; j < cols; j++) {
        if (!coveredCols[j]) {
          uncoveredCols.push(j);
        }
      }

      const minUncoveredValue = Math.min(
        ...uncoveredRows.flatMap(i =>
          uncoveredCols.map(j => matrix[i][j])
        )
      );

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (!coveredRows[i] && !coveredCols[j]) {
            matrix[i][j] -= minUncoveredValue;
          } else if (coveredRows[i] && coveredCols[j]) {
            matrix[i][j] += minUncoveredValue;
          }
        }
      }

      addStep(matrix, 'Шаг 5: Добавить строки и столбцы, чтобы обеспечить полное покрытие');
    }

    // Step 5: Find the optimal assignment
    const optimalAssignment = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        if (matrix[i][j] === 0 && !optimalAssignment.includes(j)) {
          optimalAssignment.push(j);
          break;
        }
      }
    }

    setAssignment(optimalAssignment);
    setIsVisible(true);
    setSteps(steps);
  };

  return (
    <div>
      <div>
        <h3>Введите данные:</h3>
        <div>
          <label>Количество задач:</label>
          <input
            type="number"
            value={numJobs}
            onChange={handleNumJobsChange}
          />
        </div>
        <div>
          <label>Количество работников:</label>
          <input
            type="number"
            value={numWorkers}
            onChange={handleNumWorkersChange}
          />
        </div>
        <div>
          <button onClick={handleBuildMatrix}>Построить Матрицу стоимости</button>
        </div>
        {isVisible && (
          <div>
            <h3>Матрица стоимостей:</h3>
            <table>
              <tbody>
                {costMatrix.map((row, i) => (
                  <tr key={i}>
                    {row.map((cost, j) => (
                      <td key={j}>
                        <input
                          type="number"
                          value={cost}
                          onChange={(e) => handleCostChange(i, j, e.target.value)}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div>
        <button onClick={findAssignment}>Рассчитать</button>
      </div>
      {isVisible && (
        <div>
          <h3>Оптимальное назначение:</h3>
          <ul>
            {assignment.map((col, i) => (
              <li key={i}>
                Працівник {i + 1} призначений на {col + 1} роботу
              </li>
            ))}
          </ul>
        </div>
      )}
      {isVisible && (
        <div>
          <h3>Подробное решение:</h3>
          {steps.map((step, index) => (
            <div key={index}>
              <h4>{step.description}</h4>
              <table>
                <tbody>
                  {step.matrix.map((row, i) => (
                    <tr key={i}>
                      {row.map((value, j) => (
                        <td key={j}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HungarianMethodAssignment;

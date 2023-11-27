import React, { useState, useEffect } from 'react';
import Graph from 'react-graph-vis';
import {
  smallVariable,
  mediumVariable,
  largeVariable,
} from '../VariableMatrix';
import { useTranslation } from 'react-i18next';

const FloydWarshall = () => {
  const [size, setSize] = useState(2);
  const [graph, setGraph] = useState([
    ['', ''],
    ['', ''],
  ]);
  const [solutionSteps, setSolutionSteps] = useState([]);
  const [graphData, setGraphData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useTranslation();

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: 'blue',
    },
    height: '500px',
    physics: {
      enabled: false,
    },
  };

  useEffect(() => {
    updateGraphData(graph);
  }, [graph]);

  const handleSizeChange = (event) => {
    const newSize = parseInt(event.target.value, 10);

    setSize(newSize);

    switch (newSize) {
      case 6:
        setGraph(smallVariable);
        break;
      case 10:
        setGraph(mediumVariable);
        break;
      case 20:
        setGraph(largeVariable);
        break;
      default:
        setGraph(createDefaultGraph(newSize));
    }

    setSolutionSteps([]);
  };

  const handleGraphChange = (event, rowIndex, colIndex) => {
    const newValue =
      event.target.value === '' ? Infinity : parseInt(event.target.value, 10);
    const newGraph = graph.map((row, rIndex) =>
      row.map((value, cIndex) =>
        rIndex === rowIndex && cIndex === colIndex ? newValue : value
      )
    );
    setGraph(newGraph);
    setSolutionSteps([]);
  };

  const handleSolveClick = () => {
    const n = size;
    const dist = [];
    const next = [];

    // Инициализация матрицы расстояний и матрицы "следующих" вершин
    for (let i = 0; i < n; i++) {
      dist[i] = [];
      next[i] = [];
      for (let j = 0; j < n; j++) {
        dist[i][j] = graph[i][j];
        next[i][j] = j;
      }
    }

    const steps = [];

    // Алгоритм Флойда-Уоршелла
    for (let k = 0; k < n; k++) {
      steps.push(generateStep(dist, k));
      for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
          if (dist[i][k] + dist[k][j] < dist[i][j]) {
            dist[i][j] = dist[i][k] + dist[k][j];
            next[i][j] = k;
          }
        }
      }
    }

    // Вывод результата в DOM
    setSolutionSteps(steps);
  };

  const generateStep = (dist, stepNumber) => {
    const n = dist.length;

    let step = `<h3>Шаг ${stepNumber + 1}</h3>`;
    step += '<table border="1"><thead><tr><th></th>';

    // Заголовки столбцов
    for (let i = 0; i < n; i++) {
      step += `<th>${i + 1}</th>`;
    }

    step += '</tr></thead><tbody>';

    // Заполнение таблицы
    for (let i = 0; i < n; i++) {
      step += `<tr><th>${i + 1}</th>`;
      for (let j = 0; j < n; j++) {
        let cellValue = dist[i][j];

        // Проверяем, является ли текущая ячейка частью пути
        const isPathCell =
          stepNumber === n - 1 && i !== j && dist[i][j] !== Infinity;

        step += `<td style="background: ${
          isPathCell ? 'none' : 'none'
        }">${cellValue === Infinity ? '∞' : cellValue}</td>`;
      }
      step += '</tr>';
    }

    step += '</tbody></table>';

    setIsVisible(true);

    return step;
  };

  const createDefaultGraph = (size) => {
    const defaultGraph = [];
    for (let i = 0; i < size; i++) {
      defaultGraph[i] = [];
      for (let j = 0; j < size; j++) {
        defaultGraph[i][j] = i === j ? 0 : Infinity;
      }
    }
    return defaultGraph;
  };

  const updateGraphData = (graph) => {
    const nodes = [];
    const edges = [];

    for (let i = 0; i < graph.length; i++) {
      nodes.push({ id: i + 1, label: `${i + 1}`, color: '#ccc' });
      for (let j = 0; j < graph[i].length; j++) {
        if (graph[i][j] !== Infinity && i !== j) {
          edges.push({ from: i + 1, to: j + 1, label: `${graph[i][j]}` });
        }
      }
    }

    setGraphData({ nodes, edges });
  };

  return (
    <div>
      <div className='div-size-matrix'>
        <div className='enter-size-matrix'>
          <h2>{t('Выберите матрицу')}</h2>
          <select value={size} onChange={handleSizeChange}>
            <option value={2}>Ввести вручную</option>
            <option value={6}>Маленький</option>
            <option value={10}>Средний</option>
            <option value={20}>Большой</option>
          </select>
        </div>
        <div className='size-matrix'>
          <label>
            Размер матрицы:
            <input
              type='number'
              min='2'
              value={size}
              onChange={handleSizeChange}
            />
          </label>
        </div>
        <div className='table-matrix'>
          <table>
            <tbody>
              {graph.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((value, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type='number'
                        value={value === Infinity ? '' : value}
                        onChange={(event) =>
                          handleGraphChange(event, rowIndex, colIndex)
                        }
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleSolveClick}>Решить</button>
        </div>
      </div>
      <div id='result-container'>
        {isVisible && (
          <div id='graph'>
            <h4>Граф:</h4>
            <Graph graph={graphData} options={options} />
          </div>
        )}
        <h2>Шаги решения:</h2>
        {solutionSteps.map((step, index) => (
          <div
            className='res-matrix-div'
            key={index}
            dangerouslySetInnerHTML={{ __html: step }}
          />
        ))}
      </div>
    </div>
  );
};

export default FloydWarshall;

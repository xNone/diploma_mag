// KnapsackSolver.js
import React from 'react';

function KnapsackSolver({ items, capacity, onSolve }) {
  const handleSolve = () => {
    onSolve();
  };

  return (
    <div>
      <h2>Таблица рюкзака</h2>
      <div>
        <button onClick={handleSolve}>Решить</button>
      </div>
      <div>
        <h2>Выбранные предметы:</h2>
        <ul>
          {items.map((item) => (
            <li key={item.name}>
              {item.name} - {item.value} (вес: {item.weight})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default KnapsackSolver;

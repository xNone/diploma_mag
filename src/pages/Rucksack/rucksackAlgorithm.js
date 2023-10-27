import React, { useState } from 'react';
import DataTable from './table';
// Компонент DataTable для отображения предметов
function Table({ items }) {
  return (
    <div>
      <h2>Выбранные предметы</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} (Вес: {item.weight}, Ценность: {item.value})
          </li>
        ))}
      </ul>
    </div>
  );
}

function KnapsackProblem() {
  const [items, setItems] = useState([]);
  const [capacity, setCapacity] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [maxWeight, setMaxWeight] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [newItemName, setNewItemName] = useState('');
  const [newItemWeight, setNewItemWeight] = useState(0);
  const [newItemValue, setNewItemValue] = useState(0);
  const [showDataTable, setShowDataTable] = useState(false);
  const [coordinates, setCoordinates] = useState([]);

  const addItem = () => {
    setItems([
      ...items,
      { name: newItemName, weight: newItemWeight, value: newItemValue },
    ]);
    setNewItemName('');
    setNewItemWeight(0);
    setNewItemValue(0);
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const solveKnapsack = () => {
    const n = items.length;
    const dp = Array(n + 1)
      .fill(0)
      .map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        if (items[i - 1].weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - items[i - 1].weight] + items[i - 1].value
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    setMaxValue(dp[n][capacity]);

    let w = capacity;
    const selected = [];
    for (let i = n; i > 0 && w > 0; i--) {
      if (dp[i][w] !== dp[i - 1][w]) {
        selected.push(items[i - 1]);
        w -= items[i - 1].weight;
      }
    }

    for (let i = 0; i <= items.length; i++) {
      for (let w = 0; w <= capacity; w++) {
        coordinates.push({
          i,
          w,
          dp: dp[i][w],
        });
      }
    }
    console.log('dp', dp);
    console.log('coordinates', coordinates);

    setMaxWeight(capacity - w);
    setSelectedItems(selected);
    setShowDataTable(true);
  };

  return (
    <div>
      <h1>Задача о рюкзаке</h1>
      <div>
        <h2>Ввод предметов</h2>
        <div>
          <input
            type='text'
            placeholder='Название'
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <input
            type='number'
            placeholder='Вес'
            value={newItemWeight}
            onChange={(e) => setNewItemWeight(Number(e.target.value))}
          />
          <input
            type='number'
            placeholder='Ценность'
            value={newItemValue}
            onChange={(e) => setNewItemValue(Number(e.target.value))}
          />
          <button onClick={addItem}>Добавить</button>
        </div>
      </div>
      <div>
        <h2>Добавленные предметы</h2>
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Вес</th>
              <th>Ценность</th>
              <th>Действия</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.weight}</td>
                <td>{item.value}</td>
                <td>
                  <button onClick={() => removeItem(index)}>Удалить</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Ввод веса рюкзака</h2>
        <input
          type='number'
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
        />
        <button onClick={solveKnapsack}>Решить</button>
      </div>
      <div>
        <h2>Результат</h2>
        <p>Максимальный вес рюкзака: {maxWeight}</p>
        <p>Максимальная стоимость: {maxValue}</p>
      </div>
      {showDataTable && <Table items={selectedItems} />}
      {showDataTable && (
        <DataTable
          data={coordinates}
          items={items.length + 1}
          maxWeight={capacity + 1}
        />
      )}
    </div>
  );
}

export default KnapsackProblem;

import React, { useState, useEffect } from 'react';
import DataTable from './table';

const Knapsack = () => {
  const [coordinates, setCoordinates] = useState([]);
  const [items, setItems] = useState([
    { name: 'Item 1', weight: 6, value: 5 },
    { name: 'Item 2', weight: 4, value: 3 },
    { name: 'Item 3', weight: 3, value: 1 },
    { name: 'Item 4', weight: 2, value: 3 },
    { name: 'Item 5', weight: 5, value: 6 },
  ]);
  const [maxWeight] = useState(10);
  const [result, setResult] = useState(null);

  const calculateKnapsack = () => {
    const dp = Array(items.length + 1)
      .fill(null)
      .map(() => Array(maxWeight + 1).fill(0));

    for (let i = 1; i <= items.length; i++) {
      const currentItem = items[i - 1];
      for (let w = 1; w <= maxWeight; w++) {
        if (currentItem.weight <= w) {
          dp[i][w] = Math.max(
            dp[i - 1][w],
            dp[i - 1][w - currentItem.weight] + currentItem.value
          );
        } else {
          dp[i][w] = dp[i - 1][w];
        }
      }
    }

    if (coordinates.length === 0) {
      setCoordinates(coordinates);
    }

    for (let i = 0; i <= items.length; i++) {
      for (let w = 0; w <= maxWeight; w++) {
        coordinates.push({
          i,
          w,
          dp: dp[i][w],
        });
      }
    }

    setResult(dp[items.length][maxWeight]);
  };

  useEffect(() => {
    calculateKnapsack(); // Вызовем calculateKnapsack при монтировании
  }, []); // Пустая зависимость для выполнения только при монтировании

  return (
    <>
      <div>
        <h1>Задача о рюкзаке</h1>
        <h2>Максимальный вес рюкзака: {maxWeight}</h2>
        <h2>Максимальная стоимость: {result}</h2>
        <DataTable data={coordinates} items={items.length + 1} maxWeight={maxWeight + 1} />
      </div>
    </>
  );
};

export default React.memo(Knapsack);

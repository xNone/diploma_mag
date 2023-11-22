import React, { useState } from 'react';
import DataTable from '../methodDP/table';
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

function StepByStepTable({ steps }) {
  return (
    <div>
      <h2>Поэтапное решение</h2>
      <table>
        <thead>
          <tr>
            <th>Шаг</th>
            <th>Выбранный предмет</th>
            <th>Оставшийся вес</th>
            <th>Текущий вес рюкзака</th>
            <th>Текущая ценность</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{step.selectedItem ? step.selectedItem.name : 'Нет'}</td>
              <td>{step.remainingCapacity}</td>
              <td>{step.currentWeight}</td>
              <td>{step.currentValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KnapsackProblem() {
  ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);

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
  const [stepByStep, setStepByStep] = useState([]);

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

  const solveKnapsackGreedy = () => {
    const sortedItems = items
      .slice()
      .sort((a, b) => b.value / b.weight - a.value / a.weight);

    let remainingCapacity = capacity;
    let selectedItems = [];
    let totalWeight = 0;
    let totalValue = 0;
    let coordinates = [];
    let stepByStepData = [];

    for (let item of sortedItems) {
      if (item.weight <= remainingCapacity) {
        selectedItems.push(item);
        remainingCapacity -= item.weight;
        totalWeight += item.weight;
        totalValue += item.value;
        coordinates.push({
          weight: totalWeight,
          value: totalValue,
        });
        stepByStepData.push({
          selectedItem: item,
          remainingCapacity,
          currentWeight: totalWeight,
          currentValue: totalValue,
        });
      }
    }

    setSelectedItems(selectedItems);
    setMaxWeight(totalWeight);
    setMaxValue(totalValue);
    setShowDataTable(true);
    setCoordinates(coordinates);
    setStepByStep(stepByStepData);
  };

  return (
    <div>
      <h1>Задача о рюкзаке (Метод жадібний алгоритм)</h1>
      <div>
        <h2>Ввод предметов</h2>
        <div>
          <label for='titleDP'>Название</label>
          <input
            id='titleDP'
            type='text'
            placeholder='Название'
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
          />
          <label for='weightDP'>Вес</label>
          <input
            id='weightDP'
            type='number'
            placeholder='Вес'
            value={newItemWeight}
            onChange={(e) => setNewItemWeight(Number(e.target.value))}
          />
          <label for='valueDP'>Ценность</label>
          <input
            id='valueDP'
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
        <button onClick={solveKnapsackGreedy}>Решить</button>
      </div>
      {showDataTable && (
        <>
          <div>
            <h2>Результат</h2>
            <p>Максимальный вес рюкзака: {maxWeight}</p>
            <p>Максимальная стоимость: {maxValue}</p>
          </div>
          <DataTable items={selectedItems} />
          <StepByStepTable steps={stepByStep} />
          (
          <Bar
            data={{
              labels: coordinates.map((coord, index) => `Шаг ${index + 1}`),
              datasets: [
                {
                  label: 'Вес рюкзака',
                  data: coordinates.map((coord) => coord.weight),
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
                {
                  label: 'Ценность',
                  data: coordinates.map((coord) => coord.value),
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
              ],
            }}
            options={{
              scales: {
                x: {
                  type: 'category',
                },
                y: {
                  type: 'linear',
                },
              },
            }}
          />
          )
        </>
      )}
    </div>
  );
}

export default KnapsackProblem;

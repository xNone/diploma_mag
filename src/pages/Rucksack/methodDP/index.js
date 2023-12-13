import React, { useState, useEffect } from 'react';
import DataTable from './table';
import {
  Chart as ChartJS,
  BarElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { sizeItems } from '../VariableMatrix';

function Table({ items }) {
  ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);
  const { t } = useTranslation();
  return (
    <div className='select-items-div'>
      <h2>{t('Selected items:')}</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            <span>{item.name}</span> : ({t('Weight')}: {item.weight},{' '}
            {t('Value')}: {item.value})
          </li>
        ))}
      </ul>
    </div>
  );
}

function KnapsackProblem({ onDataUpdate }) {
  ChartJS.register(BarElement, Tooltip, Legend, CategoryScale, LinearScale);
  const { t } = useTranslation();
  const [items, setItems] = useState([]);
  const [capacity, setCapacity] = useState(0);
  const [showDataTable, setShowDataTable] = useState(false);
  const [coordinates, setCoordinates] = useState([]);
  const [maxValue, setMaxValue] = useState(0);
  const [maxWeight, setMaxWeight] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedSize, setSelectedSize] = useState('');
  const [newItemName, setNewItemName] = useState('');
  const [newItemWeight, setNewItemWeight] = useState(0);
  const [newItemValue, setNewItemValue] = useState(0);
  const [dpExecutionTime, setDPExecutionTime] = useState(0);
  const [dpIterations, setDPIterations] = useState(0);
  const [memoryUsed, setMemoryUsed] = useState(0);
  const [startMemory, setStartMemory] = useState(0);
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [isCompareVisible, setIsCompareVisible] = useState(false);
  const [ishowSteps, setIshowSteps] = useState(false);

  const toggleShowSteps = () => {
    setIshowSteps(!ishowSteps);
  };

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  const handlePresetSizeChange = (size) => {
    setSelectedSize(size);
    if (size === 'Custom') {
      setNewItemName('');
      setNewItemWeight(0);
      setNewItemValue(0);
    } else {
      // Set default values for selected preset size
      const defaultItem = sizeItems[size];
      setItems(defaultItem);
    }
  };

  const addItem = () => {
    if (selectedSize && sizeItems[selectedSize]) {
      setItems(sizeItems[selectedSize]);
      setShowDataTable(true);
    } else {
      setItems([
        ...items,
        { name: newItemName, weight: newItemWeight, value: newItemValue },
      ]);
      setNewItemName('');
      setNewItemWeight(0);
      setNewItemValue(0);
      setShowDataTable(true);
    }
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const solveKnapsack = () => {
    setStartMemory(window.performance.memory.usedJSHeapSize);

    const startTime = performance.now();
    let iterationsCount = 0;

    const n = items.length;
    const dp = Array(n + 1)
      .fill(0)
      .map(() => Array(capacity + 1).fill(0));

    for (let i = 1; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        iterationsCount++;
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

    const updatedCoordinates = [];
    for (let i = 0; i <= items.length; i++) {
      for (let w = 0; w <= capacity; w++) {
        updatedCoordinates.push({
          i,
          w,
          dp: dp[i][w],
        });
      }
    }
    setCoordinates(updatedCoordinates);

    setMaxWeight(capacity - w);
    setSelectedItems(selected);
    setShowDataTable(true);

    const endTime = performance.now();
    setDPExecutionTime(endTime - startTime);
    setDPIterations(iterationsCount);

    if (items.length > 0) {
      const endMemory = window.performance.memory.usedJSHeapSize;

      const memoryUsed = (endMemory - startMemory) / (1024 * 1024);

      setMemoryUsed(memoryUsed);
    }
  };

  const handClick = () => {
    onDataUpdate(dpExecutionTime, dpIterations, memoryUsed);
    setIsCompareVisible(true);
  };

  return (
    <div>
      <div class='main-div'>
        <div className='tusk-div'>
          <h2>{t('Entry of items')}</h2>
          <div className='entr-div'>
            <label htmlFor='selectSize'>{t('Select the data:')}</label>
            <select
              id='selectSize'
              value={selectedSize}
              onChange={(e) => {
                handlePresetSizeChange(e.target.value);
              }}
            >
              <option value='Custom'>{t('Manual Entry')}</option>
              <option value='Small'>{t('Small')}</option>
              <option value='Medium'>{t('Medium')}</option>
              <option value='Large'>{t('Large')}</option>
            </select>
            {selectedSize === 'Custom' && (
              <div className='entr-custom-div'>
                <label htmlFor='titleDP'>{t('Title')}</label>
                <input
                  id='titleDP'
                  type='text'
                  placeholder={t('Title')}
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                />
                <label htmlFor='weightDP'>{t('Weight')}</label>
                <input
                  id='weightDP'
                  type='number'
                  placeholder={t('Weight')}
                  value={newItemWeight}
                  onChange={(e) => setNewItemWeight(Number(e.target.value))}
                />
                <label htmlFor='valueDP'>{t('Value')}</label>
                <input
                  id='valueDP'
                  type='number'
                  placeholder={t('Value')}
                  value={newItemValue}
                  onChange={(e) => setNewItemValue(Number(e.target.value))}
                />
              </div>
            )}
            <button onClick={addItem}>{t('Add')}</button>
          </div>
        </div>

        <div className='table-div'>
          <h2>{t('Added items')}</h2>
          <button className='table-div-button' onClick={toggleTableVisibility}>
            {isTableVisible ? t('Hide table') : t('Show table')}
          </button>

          {isTableVisible && (
            <table>
              <thead>
                <tr>
                  <th>{t('Title')}</th>
                  <th>{t('Weight')}</th>
                  <th>{t('Value')}</th>
                  <th>{t('Actions')}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.weight}</td>
                    <td>{item.value}</td>
                    <td>
                      <button onClick={() => removeItem(index)}>
                        {t('Delete')}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <div className='enter-weight-div'>
        <h2>{t('Entering the weight of the rucksack')}</h2>
        <input
          type='number'
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
        />
        <button onClick={solveKnapsack}>{t('Result')}</button>
        <button onClick={toggleShowSteps}>{t('Show steps')}</button>
        <button onClick={handClick}>{t('Compare')}</button>
      </div>

      {showDataTable && (
        <>
          <Table items={selectedItems} />
        </>
      )}
      {ishowSteps && (
        <>
          <DataTable
            data={coordinates}
            items={items.length + 1}
            maxWeight={capacity + 1}
          />

          <Bar
            data={{
              labels: coordinates.map(
                (coord, index) => `${t('Step')} ${index + 1}`
              ),
              datasets: [
                {
                  label: t('Backpack weight'),
                  data: coordinates.map((coord) => coord.dp),
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
                {
                  label: t('Value'),
                  data: coordinates.map((coord) => coord.dp),
                  backgroundColor: 'rgba(255, 99, 132, 0.2)',
                  borderColor: 'rgba(255, 99, 132, 1)',
                  borderWidth: 1,
                },
              ],
            }}
          />
        </>
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

      <ul className='circles'>
        {[...Array(10)].map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
    </div>
  );
}

export default KnapsackProblem;

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
import { useTranslation } from 'react-i18next';

function StepByStepTable({ steps }) {
  const { t } = useTranslation();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>{t('Step')}</th>
            <th>{t('Selected subject')}</th>
            <th>{t('Remaining weight')}</th>
            <th>{t('Selected subject')}</th>
            <th>{t('Current value')}</th>
          </tr>
        </thead>
        <tbody>
          {steps.map((step, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{step.selectedItem ? step.selectedItem.name : 'No'}</td>
              <td>{step.currentWeight}</td>
              <td>{step.remainingCapacity}</td>
              <td>{step.currentValue}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KnapsackSolver() {
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
  const [presetSize, setPresetSize] = useState('Custom');
  const { t } = useTranslation();
  const presetSizes = {
    Custom: { name: 'Custom', weight: 0, value: 0 },
    Small: [
      { name: 'A', weight: 6, value: 5 },
      { name: 'B', weight: 4, value: 3 },
      { name: 'C', weight: 3, value: 1 },
      { name: 'D', weight: 2, value: 3 },
      { name: 'E', weight: 5, value: 6 },
      // Add more items as needed
    ],
    Medium: [
      { name: 'F', weight: 8, value: 7 },
      { name: 'G', weight: 5, value: 4 },
      { name: 'H', weight: 3, value: 2 },
      // Add more items as needed
    ],
    Large: [
      { name: 'I', weight: 10, value: 9 },
      { name: 'J', weight: 7, value: 5 },
      { name: 'K', weight: 4, value: 3 },
      // Add more items as needed
    ],
  };

  const handlePresetSizeChange = (size) => {
    setPresetSize(size);
    if (size === 'Custom') {
      setNewItemName('');
      setNewItemWeight(0);
      setNewItemValue(0);
    } else {
      // Set default values for selected preset size
      const defaultItem = presetSizes[size];
      console.log('defaultItem', defaultItem);
      setItems(defaultItem);
    }
  };

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
      <div className='main-div'>
        <div className='tusk-div'>
          <h2>{t('Entry of items')}</h2>
          <div class='entr-div'>
            <label htmlFor='presetSize'>{t('Select the data:')}</label>
            <select
              id='presetSize'
              value={presetSize}
              onChange={(e) => handlePresetSizeChange(e.target.value)}
            >
              <option value='Custom'>{t('Manual Entry')}</option>
              <option value='Small'>{t('Small')}</option>
              <option value='Medium'>{t('Medium')}</option>
              <option value='Large'>{t('Large')}</option>
            </select>
            {presetSize === 'Custom' && (
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
                    <button onClick={() => removeItem(index)}>{t('Delete')}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className='enter-weight-div'>
        <h2>{t('Entering the weight of the rucksack')}</h2>
        <input
          type='number'
          value={capacity}
          onChange={(e) => setCapacity(Number(e.target.value))}
        />
        <button onClick={solveKnapsackGreedy}>{t('Result')}</button>
      </div>
      {showDataTable && (
        <>
          <div>
            <h2>{t('Solution')}</h2>
            <p>{t('Maximum weight of the backpack:')} {maxWeight}</p>
            <p>{t('Maximum value:')} {maxValue}</p>
          </div>
          <DataTable items={selectedItems} />
          <StepByStepTable steps={stepByStep} />

          <Bar
            data={{
              labels: coordinates.map((coord, index) => `${t('Step')} ${index + 1}`),
              datasets: [
                {
                  label: t('Backpack weight'),
                  data: coordinates.map((coord) => coord.weight),
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1,
                },
                {
                  label: t('Value'),
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
        </>
      )}
      <ul className='circles'>
        {[...Array(10)].map((_, index) => (
          <li key={index}></li>
        ))}
      </ul>
    </div>
  );
}

export default KnapsackSolver;

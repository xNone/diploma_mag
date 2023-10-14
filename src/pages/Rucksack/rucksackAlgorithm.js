import React, { useState } from 'react';

function KnapsackApp() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', weight: 0, value: 0 });
  const [capacity, setCapacity] = useState(0);
  const [selectedItems, setSelectedItems] = useState([]);
  const [totalValue, setTotalValue] = useState(0);

  const handleInputChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleAddItem = () => {
    setItems([...items, newItem]);
    setNewItem({ name: '', weight: 0, value: 0 });
  };

  const handleDeleteItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  const knapsackGreedy = () => {
    const sortedItems = [...items];
    sortedItems.sort((a, b) => b.value / b.weight - a.value / a.weight);

    let currentWeight = 0;
    let currentValue = 0;
    const selected = [];

    for (let i = 0; i < sortedItems.length; i++) {
      if (currentWeight + sortedItems[i].weight <= capacity) {
        selected.push(sortedItems[i]);
        currentWeight += sortedItems[i].weight;
        currentValue += sortedItems[i].value;
      }
    }

    setSelectedItems(selected);
    setTotalValue(currentValue);
  };

  return (
    <div>
      <h1>Задача о рюкзаке</h1>
      <div>
        <label>
          Вместимость рюкзака:
          <input
            type="number"
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
          />
        </label>
      </div>
      <div>
        <h2>Добавить предмет:</h2>
        <div>
          <label>
            Название:
            <input
              type="text"
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </label>
          <label>
            Вес:
            <input
              type="number"
              value={newItem.weight}
              onChange={(e) => setNewItem({ ...newItem, weight: parseInt(e.target.value) })}
            />
          </label>
          <label>
            Ценность:
            <input
              type="number"
              value={newItem.value}
              onChange={(e) => setNewItem({ ...newItem, value: parseInt(e.target.value) })}
            />
          </label>
          <button onClick={handleAddItem}>Добавить</button>
        </div>
      </div>
      <div>
        <h2>Предметы:</h2>
        {items.map((item, index) => (
          <div key={index}>
            <label>
              Название:
              <input
                type="text"
                value={item.name || ''}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
              />
            </label>
            <label>
              Вес:
              <input
                type="number"
                value={item.weight || ''}
                onChange={(e) => handleInputChange(index, 'weight', parseInt(e.target.value))}
              />
            </label>
            <label>
              Ценность:
              <input
                type="number"
                value={item.value || ''}
                onChange={(e) => handleInputChange(index, 'value', parseInt(e.target.value))}
              />
            </label>
            <button onClick={() => handleDeleteItem(index)}>Удалить</button>
          </div>
        ))}
        <button onClick={knapsackGreedy}>Решить</button>
      </div>
      <div>
        <h2>Выбранные предметы:</h2>
        <ul>
          {selectedItems.map((item) => (
            <li key={item.name}>
              {item.name} - {item.value} (вес: {item.weight})
            </li>
          ))}
        </ul>
        <h2>Общая стоимость: {totalValue}</h2>
      </div>
    </div>
  );
}

export default KnapsackApp;

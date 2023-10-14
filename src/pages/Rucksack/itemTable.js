import React, { useState } from 'react';

function ItemTable({ items, setItems }) {
  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Предмет</th>
          <th>Вес</th>
          <th>Стоимость</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>Предмет {index + 1}</td>
            <td>
              <input
                type="number"
                value={item.weight}
                onChange={(e) => handleItemChange(index, 'weight', e.target.value)}
              />
            </td>
            <td>
              <input
                type="number"
                value={item.value}
                onChange={(e) => handleItemChange(index, 'value', e.target.value)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default ItemTable;

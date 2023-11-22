import React, { useEffect, useState } from 'react';

const DataTable = ({ data, items, maxWeight }) => {
  const [dataTables, setDataTables] = useState([]);

  useEffect(() => {
    const tables = [];

    for (let i = 0; i < items; i++) {
      const tableData = [];
      for (let d = 0; d <= i; d++) {
        const rowData = [];
        for (let j = 0; j < maxWeight; j++) {
          const dataValue = data.find((e) => e.i === d && e.w === j);
          rowData.push(
            <td key={`data-${d}-${j}`} data-row={`${d}${j}`}>
              {dataValue ? dataValue.dp : ''}
            </td>
          );
        }
        tableData.push(
          <tr key={`row-${d}`}>
            <td key={`number-${d}`}>{d}</td>
            {rowData}
          </tr>
        );
      }

      const table = (
        <table key={i}>
          <thead>
            <tr>
              <th>Number</th>
              {Array.from({ length: maxWeight }, (_, index) => (
                <th key={index}>{index}</th>
              ))}
            </tr>
          </thead>
          <tbody>{tableData}</tbody>
        </table>
      );

      tables.push(table);
    }

    setDataTables(tables);
  }, [data, items, maxWeight]);

  return <div>{dataTables}</div>;
};

export default React.memo(DataTable);

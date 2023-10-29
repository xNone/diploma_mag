import React, { useEffect, useState } from 'react';

const DataTable = ({ data, items, maxWeight }) => {
  const [dataTables, setDataTables] = useState([]);

  useEffect(() => {
    const tables = [];

    for (let i = 0; i < items; i++) {
      const headerCells = [];
      for (let j = 0; j < maxWeight; j++) {
        const dataValue = data.find((e) => e.i === i && e.w === j);
        headerCells.push(
          <th key={j} data-row={`${i}${j}`}>
            {dataValue ? dataValue.dp : ''}
          </th>
        );
      }

      const headerRow = (
        <tr key={`header-${i}`}>
          <th>Number</th>
          {headerCells}
        </tr>
      );

      const dataRows = [];
      const dataRows2 = [];

      for (let d = 0; d <= i; d++) {
        const cells = [];

        cells.push(<td key={`number-${d}`}>{d}</td>);

        for (let j = 0; j < maxWeight; j++) {
          const dataValue = data.find((e) => e.i === d && e.w === j);

          cells.push(
            <td key={`data-${d}-${j}`} data-row={`${d}${j}`}>
              {dataValue ? dataValue.dp : ''}
            </td>
          );
        }

        dataRows.push(<tr key={`row-${d}`}>{cells}</tr>);
      }

      for (let d = 0; d <= i; d++) {
        const cells2 = [];

        cells2.push(<td key={`number2-${d}`}>'2'</td>);

        for (let j = 0; j < maxWeight; j++) {
          const dataValue = data.find((e) => e.i === d && e.w === j);

          cells2.push(
            <td key={`data2-${d}-${j}`} data-row={`${d}${j}`}>
              'test'
            </td>
          );
        }

        dataRows2.push(<tr key={`row2-${d}`}>{cells2}</tr>);
      }

      const table = (
        <table key={i}>
          <thead>{headerRow}</thead>
          <tbody>{dataRows}</tbody>
          <tbody>{dataRows2}</tbody>
        </table>
      );

      tables.push(table);
    }

    setDataTables(tables);

    return () => {
      setDataTables([]);
    };
  }, [data, items, maxWeight]);

  return <div>{dataTables}</div>;
};

export default React.memo(DataTable);

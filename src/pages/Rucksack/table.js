import React, { useEffect, useState } from 'react';

const DataTable = ({ data, items, maxWeight }) => {
  const [dataRowValues, setDataRowValues] = useState([]);
  console.log(data.length)
  useEffect(() => {
    const headerCells = [];
    for (let i = 0; i < maxWeight; i++) {
      headerCells.push(<th key={i}>Header {i}</th>);
    }

    const tables = [];

    for (let d = 0; d < 5; d++) {
      const headerRow = (
        <tr>
          <th>Number</th>
          {headerCells}
        </tr>
      );

      const dataRows = [];

      for (let i = 0; i < items; i++) {
        const cells = [];
        cells.push(<td key='number'>{i}</td>);

        for (let j = 0; j < maxWeight; j++) {
          const dataValue = data.find((e) => e.i === i && e.w === j);
          cells.push(
            <td key={j} data-row={`${i}${j}`}>
              {dataValue ? dataValue.dp : ''}
            </td>
          );
        }

        dataRows.push(<tr key={i}>{cells}</tr>);
      }

      const table = (
        <table key={d} data-table={d}>
          <thead>{headerRow}</thead>
          <tbody>{dataRows}</tbody>
        </table>
      );

      tables.push(table);
    }

    setDataRowValues(tables);
  }, [data, items, maxWeight]);

  return <div>{dataRowValues}</div>;
};

export default React.memo(DataTable);

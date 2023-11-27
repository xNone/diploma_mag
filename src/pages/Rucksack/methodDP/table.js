import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const DataTable = ({ data, items, maxWeight }) => {
  const [dataTables, setDataTables] = useState([]);
  const { t } = useTranslation();

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
        <table key={i} className='table-div'>
          <thead>
            <tr>
              <th>i</th>
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

  return (
    <div className='main-table-div'>
      <h2>{t('Step-by-step completion of the table:')}</h2>
      {dataTables}
    </div>
  );
};

export default React.memo(DataTable);

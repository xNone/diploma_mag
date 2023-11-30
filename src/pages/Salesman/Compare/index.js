import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function CompareSalesman(props) {
  const { t } = useTranslation();

  return (
    <div className='compare-div'>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>{t('Dynamic Programming')}</th>
            <th>{t('Greedy Algorithm')}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t('Execution time')}</td>
            <td>{props.dpExecutionTimeDP.toFixed(10)} ms</td>
            <td>{props.dpExecutionTimeGA.toFixed(10)} ms</td>
          </tr>
          <tr>
            <td>{t('Number of iterations')}</td>
            <td>{props.dpIterationsDP}</td>
            <td>{props.dpIterationsGA}</td>
          </tr>
          <tr>
            <td>{t('Memory used')}</td>
            <td>{props.memoryUsedDP.toFixed(4)} MB</td>
            <td>{props.memoryUsedGA.toFixed(4)} MB</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default CompareSalesman;

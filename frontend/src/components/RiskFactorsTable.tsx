import React from 'react';

interface RiskFactor {
  factor: string;
  weight: number;
  recommendation: string;
}

const demoFactors: RiskFactor[] = [
  {
    factor: 'Печное отопление',
    weight: 25,
    recommendation: 'Назначить специальные условия страхования',
  },
  {
    factor: 'Дом старше 30 лет',
    weight: 15,
    recommendation: 'Запросить дополнительный осмотр',
  },
];

export function RiskFactorsTable() {
  return (
    <table>
      <thead>
        <tr>
          <th>Фактор риска</th>
          <th>Вес</th>
          <th>Рекомендация</th>
        </tr>
      </thead>
      <tbody>
        {demoFactors.map((factor) => (
          <tr key={factor.factor}>
            <td>{factor.factor}</td>
            <td>{factor.weight}</td>
            <td>{factor.recommendation}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

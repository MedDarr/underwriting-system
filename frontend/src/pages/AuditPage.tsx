import React from 'react';

const demoLogs = [
  'Создана заявка HOME-2026-001',
  'Выполнена проверка безопасности',
  'Рассчитан RiskScore = 45',
  'Сформирована рекомендация по специальным условиям',
];

export function AuditPage() {
  return (
    <section className="panel">
      <h2>Журнал аудита</h2>
      <ul>
        {demoLogs.map((log) => (
          <li key={log}>{log}</li>
        ))}
      </ul>
    </section>
  );
}

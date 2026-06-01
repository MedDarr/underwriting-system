import React, { useMemo, useState } from 'react';
import './styles.css';

type RiskLevel = 'low' | 'medium' | 'high';

type ApplicationStatus =
  | 'registered'
  | 'checking'
  | 'scoring'
  | 'decision'
  | 'approved'
  | 'approved_special'
  | 'need_info'
  | 'declined';

interface ApplicationCard {
  applicationId: number;
  applicationNumber: string;
  applicantName: string;
  address: string;
  status: ApplicationStatus;
  priority: 'normal' | 'high';
  riskLevel: RiskLevel;
  totalScore: number;
}

const applications: ApplicationCard[] = [
  {
    applicationId: 1,
    applicationNumber: 'HOME-2026-001',
    applicantName: 'Смирнова Анна Петровна',
    address: 'Краснодарский край, г. Краснодар, ул. Садовая, 15',
    status: 'decision',
    priority: 'normal',
    riskLevel: 'medium',
    totalScore: 45,
  },
  {
    applicationId: 2,
    applicationNumber: 'HOME-2026-002',
    applicantName: 'Иванов Риск Сергеевич',
    address: 'Краснодарский край, ст. Динская, ул. Полевая, 4',
    status: 'checking',
    priority: 'high',
    riskLevel: 'high',
    totalScore: 85,
  },
  {
    applicationId: 3,
    applicationNumber: 'HOME-2026-003',
    applicantName: 'Кузнецов Павел Игоревич',
    address: 'Краснодарский край, г. Анапа, ул. Морская, 9',
    status: 'approved',
    priority: 'normal',
    riskLevel: 'low',
    totalScore: 15,
  },
];

const riskLabels: Record<RiskLevel, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

const statusLabels: Record<ApplicationStatus, string> = {
  registered: 'Зарегистрирована',
  checking: 'Проверка',
  scoring: 'Скоринг',
  decision: 'Решение',
  approved: 'Согласована',
  approved_special: 'Спецусловия',
  need_info: 'Нужны сведения',
  declined: 'Отказ',
};

function App() {
  const [selectedId, setSelectedId] = useState(1);
  const selected = useMemo(
    () => applications.find((item) => item.applicationId === selectedId) ?? applications[0],
    [selectedId],
  );

  return (
    <main className="page">
      <header className="header">
        <div>
          <p className="eyebrow">Рабочее место андеррайтера</p>
          <h1>Поддержка андеррайтинга страхования частных домов</h1>
        </div>
        <div className="badge">GitHub prototype</div>
      </header>

      <section className="layout">
        <aside className="panel list">
          <h2>Заявки</h2>
          {applications.map((application) => (
            <button
              key={application.applicationId}
              className={application.applicationId === selectedId ? 'listItem active' : 'listItem'}
              onClick={() => setSelectedId(application.applicationId)}
            >
              <span>{application.applicationNumber}</span>
              <strong>{application.applicantName}</strong>
              <small>{statusLabels[application.status]}</small>
            </button>
          ))}
        </aside>

        <section className="panel card">
          <div className="cardHeader">
            <div>
              <h2>{selected.applicationNumber}</h2>
              <p>{selected.applicantName}</p>
            </div>
            <span className={`risk ${selected.riskLevel}`}>{riskLabels[selected.riskLevel]}</span>
          </div>

          <div className="grid">
            <div>
              <span className="label">Адрес объекта</span>
              <p>{selected.address}</p>
            </div>
            <div>
              <span className="label">Статус</span>
              <p>{statusLabels[selected.status]}</p>
            </div>
            <div>
              <span className="label">Приоритет</span>
              <p>{selected.priority === 'high' ? 'Высокий' : 'Обычный'}</p>
            </div>
            <div>
              <span className="label">RiskScore</span>
              <p>{selected.totalScore} баллов</p>
            </div>
          </div>

          <section className="subpanel">
            <h3>Факторы риска</h3>
            <ul>
              <li>Материал стен и тип отопления проверяются по правилам андеррайтинга.</li>
              <li>История убытков и blacklist-признак учитываются при маршрутизации.</li>
              <li>При среднем риске система рекомендует специальные условия.</li>
            </ul>
          </section>

          <section className="subpanel">
            <h3>Рекомендация системы</h3>
            <p>
              {selected.riskLevel === 'low'
                ? 'Рекомендуется стандартное согласование заявки.'
                : selected.riskLevel === 'medium'
                  ? 'Рекомендуется согласование заявки на специальных условиях.'
                  : 'Рекомендуется ручное рассмотрение старшим андеррайтером или службой безопасности.'}
            </p>
          </section>
        </section>
      </section>
    </main>
  );
}

export default App;

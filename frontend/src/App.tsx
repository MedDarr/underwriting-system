import React, { useMemo, useState } from 'react';
import './styles.css';
import { ApplicationsPage } from './pages/ApplicationsPage';
import { ApplicationCardPage } from './pages/ApplicationCardPage';
import { AuditPage } from './pages/AuditPage';
import { ApiPage } from './pages/ApiPage';
import { demoApplications } from './services/api';

type ViewMode = 'application' | 'audit' | 'api';

function App() {
  const [selectedId, setSelectedId] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('application');

  const selected = useMemo(
    () => demoApplications.find((item) => item.applicationId === selectedId) ?? demoApplications[0],
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

      <nav className="tabs">
        <button
          className={viewMode === 'application' ? 'tab activeTab' : 'tab'}
          onClick={() => setViewMode('application')}
        >
          Заявки и скоринг
        </button>
        <button
          className={viewMode === 'audit' ? 'tab activeTab' : 'tab'}
          onClick={() => setViewMode('audit')}
        >
          Журнал аудита
        </button>
        <button
          className={viewMode === 'api' ? 'tab activeTab' : 'tab'}
          onClick={() => setViewMode('api')}
        >
          API-методы
        </button>
      </nav>

      {viewMode === 'api' ? (
        <ApiPage />
      ) : (
        <section className="layout">
          <ApplicationsPage
            applications={demoApplications}
            selectedId={selectedId}
            onSelect={setSelectedId}
          />

          {viewMode === 'application' ? (
            <ApplicationCardPage application={selected} />
          ) : (
            <AuditPage />
          )}
        </section>
      )}
    </main>
  );
}

export default App;

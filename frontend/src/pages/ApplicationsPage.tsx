import React from 'react';
import { ApplicationCard, riskLabels, statusLabels } from '../services/api';

interface ApplicationsPageProps {
  applications: ApplicationCard[];
  selectedId: number;
  onSelect: (applicationId: number) => void;
}

export function ApplicationsPage({ applications, selectedId, onSelect }: ApplicationsPageProps) {
  return (
    <aside className="panel list">
      <h2>Заявки на андеррайтинг</h2>
      {applications.map((application) => (
        <button
          key={application.applicationId}
          className={application.applicationId === selectedId ? 'listItem active' : 'listItem'}
          onClick={() => onSelect(application.applicationId)}
        >
          <span>{application.applicationNumber}</span>
          <strong>{application.applicantName}</strong>
          <small>{statusLabels[application.status]} · риск: {riskLabels[application.riskLevel]}</small>
        </button>
      ))}
    </aside>
  );
}

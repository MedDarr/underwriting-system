import React from 'react';
import { ApplicationCard, riskLabels, statusLabels } from '../services/api';
import { RiskFactorsTable } from '../components/RiskFactorsTable';
import { RecommendationPanel } from '../components/RecommendationPanel';

interface ApplicationCardPageProps {
  application: ApplicationCard;
}

export function ApplicationCardPage({ application }: ApplicationCardPageProps) {
  return (
    <section className="panel card">
      <div className="cardHeader">
        <div>
          <h2>{application.applicationNumber}</h2>
          <p>{application.applicantName}</p>
        </div>
        <span className={`risk ${application.riskLevel}`}>
          {riskLabels[application.riskLevel]}
        </span>
      </div>

      <div className="grid">
        <div>
          <span className="label">Адрес объекта</span>
          <p>{application.address}</p>
        </div>
        <div>
          <span className="label">Статус</span>
          <p>{statusLabels[application.status]}</p>
        </div>
        <div>
          <span className="label">Приоритет</span>
          <p>{application.priority}</p>
        </div>
        <div>
          <span className="label">RiskScore</span>
          <p>{application.totalScore}</p>
        </div>
      </div>

      <RiskFactorsTable />
      <RecommendationPanel />
    </section>
  );
}

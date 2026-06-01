export type RiskLevel = 'low' | 'medium' | 'high';
export type ApplicationStatus =
  | 'registered'
  | 'checking'
  | 'scoring'
  | 'decision'
  | 'approved'
  | 'approved_special'
  | 'need_info'
  | 'declined';

export interface ApplicationCard {
  applicationId: number;
  applicationNumber: string;
  applicantName: string;
  address: string;
  status: ApplicationStatus;
  priority: 'normal' | 'high';
  riskLevel: RiskLevel;
  totalScore: number;
}

export const demoApplications: ApplicationCard[] = [
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

export const riskLabels: Record<RiskLevel, string> = {
  low: 'Низкий',
  medium: 'Средний',
  high: 'Высокий',
};

export const statusLabels: Record<ApplicationStatus, string> = {
  registered: 'Зарегистрирована',
  checking: 'Проверка',
  scoring: 'Скоринг',
  decision: 'Решение',
  approved: 'Согласована',
  approved_special: 'Спецусловия',
  need_info: 'Нужны сведения',
  declined: 'Отказ',
};

export async function getApplications(): Promise<ApplicationCard[]> {
  return demoApplications;
}

export type ApplicationStatus = 'draft' | 'registered' | 'checking' | 'scoring' | 'decision' | 'approved' | 'approved_special' | 'need_info' | 'declined';
export type RiskLevel = 'low' | 'medium' | 'high';

export interface Applicant {
  applicantId: number;
  fullName: string;
  phone: string;
  email?: string;
  passportData?: string;
}

export interface PropertyObject {
  objectId: number;
  applicationId: number;
  address: string;
  area: number;
  constructionYear: number;
  wallMaterial: string;
  roofMaterial: string;
  heatingType: string;
  floors: number;
  hasSecurityAlarm: boolean;
}

export interface InsuranceApplication {
  applicationId: number;
  applicationNumber: string;
  applicantId: number;
  responsibleUserId?: number;
  status: ApplicationStatus;
  priority: 'low' | 'normal' | 'high';
  riskLevel?: RiskLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface UnderwritingRule {
  ruleId: number;
  ruleCode: string;
  factorName: string;
  weight: number;
  applies: (property: PropertyObject) => boolean;
}

export interface RiskFactor {
  factorName: string;
  weight: number;
}

export interface ScoringResult {
  applicationId: number;
  totalScore: number;
  riskLevel: RiskLevel;
  factors: RiskFactor[];
}

export interface SecurityCheckResult {
  applicantId: number;
  blacklistHit: boolean;
  lossHistoryCount: number;
  comment: string;
}

export interface UnderwritingDecision {
  applicationId: number;
  decision: ApplicationStatus;
  recommendation: string;
  comment: string;
}

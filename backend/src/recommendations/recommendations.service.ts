export type RiskLevel = 'low' | 'medium' | 'high';
export type DecisionType = 'approved' | 'approved_special' | 'need_info' | 'declined' | 'manual_review';

export interface RiskFactorResult {
  code: string;
  factorName: string;
  weight: number;
  recommendation: string;
}

export interface RecommendationInput {
  applicationId: number;
  totalScore: number;
  riskLevel: RiskLevel;
  factors: RiskFactorResult[];
  blacklistHit?: boolean;
  documentsComplete?: boolean;
}

export interface RecommendationView {
  applicationId: number;
  decisionType: DecisionType;
  text: string;
  reasons: string[];
  createdAt: string;
}

export class RecommendationsService {
  build(input: RecommendationInput): RecommendationView {
    const reasons = input.factors.map((factor) => `${factor.factorName}: ${factor.recommendation}`);

    if (input.blacklistHit) {
      return this.create(input.applicationId, 'manual_review', 'Заявку необходимо передать в службу безопасности из-за совпадения по черному списку.', reasons);
    }

    if (input.documentsComplete === false) {
      return this.create(input.applicationId, 'need_info', 'Необходимо запросить дополнительные сведения или недостающие документы.', reasons);
    }

    if (input.riskLevel === 'low') {
      return this.create(input.applicationId, 'approved', 'Рекомендуется стандартное согласование заявки.', reasons);
    }

    if (input.riskLevel === 'medium') {
      return this.create(input.applicationId, 'approved_special', 'Рекомендуется согласование заявки на специальных условиях.', reasons);
    }

    return this.create(input.applicationId, 'manual_review', 'Рекомендуется ручное рассмотрение старшим андеррайтером.', reasons);
  }

  private create(applicationId: number, decisionType: DecisionType, text: string, reasons: string[]): RecommendationView {
    return {
      applicationId,
      decisionType,
      text,
      reasons,
      createdAt: new Date().toISOString(),
    };
  }
}

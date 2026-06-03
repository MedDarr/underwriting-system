import { Injectable } from '@nestjs/common';

export type RiskLevel = 'low' | 'medium' | 'high';

export interface PropertyRiskInput {
  applicationId: number;
  constructionYear: number;
  wallMaterial: string;
  heatingType: string;
  hasSecurityAlarm: boolean;
  hasInspectionAct: boolean;
  blacklistHit: boolean;
  previousDecline: boolean;
  coverageLimitExceeded: boolean;
  fireStationDistanceKm?: number;
}

export interface RiskFactorResult {
  code: string;
  factorName: string;
  condition: string;
  weight: number;
  recommendation: string;
}

export interface ScoringResultView {
  applicationId: number;
  totalScore: number;
  riskLevel: RiskLevel;
  factors: RiskFactorResult[];
  calculatedAt: string;
}

interface UnderwritingRule {
  code: string;
  factorName: string;
  condition: string;
  weight: number;
  recommendation: string;
  applies: (input: PropertyRiskInput) => boolean;
}

@Injectable()
export class ScoringService {
  private readonly rules: UnderwritingRule[] = [
    {
      code: 'WOOD_WALLS',
      factorName: 'Материал стен',
      condition: 'деревянный дом',
      weight: 20,
      recommendation: 'Запросить акт осмотра',
      applies: (input) => input.wallMaterial.toLowerCase().includes('дерев'),
    },
    {
      code: 'STOVE_HEATING',
      factorName: 'Тип отопления',
      condition: 'печное отопление',
      weight: 25,
      recommendation: 'Установить франшизу или ограничить покрытие',
      applies: (input) => input.heatingType.toLowerCase().includes('печ'),
    },
    {
      code: 'OLD_BUILDING',
      factorName: 'Возраст объекта',
      condition: 'объект старше 30 лет',
      weight: 15,
      recommendation: 'Провести дополнительную проверку',
      applies: (input) => new Date().getFullYear() - input.constructionYear > 30,
    },
    {
      code: 'FIRE_STATION_DISTANCE',
      factorName: 'Удаленность пожарной части',
      condition: 'более 15 км до ближайшей пожарной части',
      weight: 18,
      recommendation: 'Уточнить противопожарные меры и рассмотреть специальные условия',
      applies: (input) => (input.fireStationDistanceKm ?? 0) > 15,
    },
    {
      code: 'NO_SECURITY_ALARM',
      factorName: 'Сигнализация',
      condition: 'сигнализация отсутствует',
      weight: 10,
      recommendation: 'Согласование на специальных условиях',
      applies: (input) => !input.hasSecurityAlarm,
    },
    {
      code: 'NO_INSPECTION_ACT',
      factorName: 'Документы',
      condition: 'отсутствует акт осмотра',
      weight: 20,
      recommendation: 'Вернуть заявку на доработку',
      applies: (input) => !input.hasInspectionAct,
    },
    {
      code: 'BLACKLIST_HIT',
      factorName: 'Черный список',
      condition: 'выявлено совпадение',
      weight: 60,
      recommendation: 'Передать в службу безопасности',
      applies: (input) => input.blacklistHit,
    },
    {
      code: 'COVERAGE_LIMIT_EXCEEDED',
      factorName: 'Лимит покрытия',
      condition: 'превышает допустимое значение',
      weight: 30,
      recommendation: 'Передать старшему андеррайтеру',
      applies: (input) => input.coverageLimitExceeded,
    },
    {
      code: 'PREVIOUS_DECLINE',
      factorName: 'История страхования',
      condition: 'ранее был отказ',
      weight: 25,
      recommendation: 'Назначить ручное рассмотрение',
      applies: (input) => input.previousDecline,
    },
  ];

  calculate(input: PropertyRiskInput): ScoringResultView {
    this.validateRiskInput(input);

    const factors = this.rules
      .filter((rule) => rule.applies(input))
      .map(({ code, factorName, condition, weight, recommendation }) => ({
        code,
        factorName,
        condition,
        weight,
        recommendation,
      }));
    const totalScore = factors.reduce((sum, factor) => sum + factor.weight, 0);

    return {
      applicationId: input.applicationId,
      totalScore,
      riskLevel: this.resolveRiskLevel(totalScore),
      factors,
      calculatedAt: new Date().toISOString(),
    };
  }

  private validateRiskInput(input: PropertyRiskInput): void {
    const currentYear = new Date().getFullYear();

    if (!input.applicationId || input.applicationId <= 0) {
      throw new Error('Application identifier is required for scoring');
    }

    if (input.constructionYear < 1850 || input.constructionYear > currentYear) {
      throw new Error('Construction year is out of allowed range');
    }

    if (!input.wallMaterial?.trim()) {
      throw new Error('Wall material is required for scoring');
    }

    if (!input.heatingType?.trim()) {
      throw new Error('Heating type is required for scoring');
    }

    if (input.fireStationDistanceKm !== undefined && input.fireStationDistanceKm < 0) {
      throw new Error('Fire station distance must be a positive value');
    }
  }

  private resolveRiskLevel(totalScore: number): RiskLevel {
    if (totalScore < 30) return 'low';
    if (totalScore < 60) return 'medium';
    return 'high';
  }
}

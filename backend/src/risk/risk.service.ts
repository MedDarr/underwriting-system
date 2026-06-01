import { PropertyObject, RiskFactor, RiskLevel, ScoringResult, UnderwritingRule } from '../domain/models';

export class RiskService {
  private readonly rules: UnderwritingRule[] = [
    {
      ruleId: 1,
      ruleCode: 'OLD_BUILDING',
      factorName: 'Дом старше 40 лет',
      weight: 25,
      applies: (property) => new Date().getFullYear() - property.constructionYear > 40,
    },
    {
      ruleId: 2,
      ruleCode: 'WOOD_WALLS',
      factorName: 'Деревянные стены',
      weight: 20,
      applies: (property) => property.wallMaterial.toLowerCase().includes('дерев'),
    },
    {
      ruleId: 3,
      ruleCode: 'STOVE_HEATING',
      factorName: 'Печное отопление',
      weight: 25,
      applies: (property) => property.heatingType.toLowerCase().includes('печ'),
    },
    {
      ruleId: 4,
      ruleCode: 'NO_SECURITY',
      factorName: 'Отсутствие сигнализации',
      weight: 10,
      applies: (property) => !property.hasSecurityAlarm,
    },
  ];

  calculate(applicationId: number, property: PropertyObject): ScoringResult {
    const factors: RiskFactor[] = this.rules
      .filter((rule) => rule.applies(property))
      .map((rule) => ({ factorName: rule.factorName, weight: rule.weight }));

    const totalScore = factors.reduce((sum, factor) => sum + factor.weight, 0);
    const riskLevel = this.toRiskLevel(totalScore);

    return { applicationId, totalScore, riskLevel, factors };
  }

  private toRiskLevel(score: number): RiskLevel {
    if (score < 30) return 'low';
    if (score < 60) return 'medium';
    return 'high';
  }
}

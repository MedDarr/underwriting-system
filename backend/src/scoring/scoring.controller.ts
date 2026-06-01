import { PropertyRiskInput, ScoringService } from './scoring.service';

export class ScoringController {
  constructor(private readonly scoringService = new ScoringService()) {}

  /**
   * POST /scoring/calculate
   * Расчет скоринговой оценки риска по характеристикам объекта страхования,
   * результатам проверок безопасности и комплектности документов.
   */
  calculate(dto: PropertyRiskInput) {
    return this.scoringService.calculate(dto);
  }
}

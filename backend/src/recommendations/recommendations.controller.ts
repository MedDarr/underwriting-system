import { RecommendationInput, RecommendationsService } from './recommendations.service';

export class RecommendationsController {
  constructor(private readonly recommendationsService = new RecommendationsService()) {}

  /**
   * POST /recommendations
   * Формирование рекомендации на основании результата скоринга,
   * факторов риска, blacklist-признака и комплектности документов.
   */
  build(dto: RecommendationInput) {
    return this.recommendationsService.build(dto);
  }

  /**
   * GET /recommendations/{applicationId}
   * Учебный эндпоинт для получения демонстрационной рекомендации по заявке.
   * В промышленной версии данные должны извлекаться из таблицы recommendations.
   */
  findByApplication(applicationId: number) {
    return {
      applicationId,
      decisionType: 'manual_review',
      text: 'Демонстрационная рекомендация: требуется анализ андеррайтера по материалам электронного досье.',
      reasons: ['Рекомендация сформирована в учебном прототипе'],
      createdAt: new Date().toISOString(),
    };
  }
}

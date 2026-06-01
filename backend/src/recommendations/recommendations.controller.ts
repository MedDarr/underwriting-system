import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecommendationInput, RecommendationsService } from './recommendations.service';

@ApiTags('recommendations')
@Controller('recommendations')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Post()
  @ApiOperation({ summary: 'Формирование рекомендации по заявке' })
  build(@Body() dto: RecommendationInput) {
    return this.recommendationsService.build(dto);
  }

  @Get(':applicationId')
  @ApiOperation({ summary: 'Получение рекомендации по заявке' })
  findByApplication(@Param('applicationId') applicationId: string) {
    return {
      applicationId: Number(applicationId),
      decisionType: 'manual_review',
      text: 'Демонстрационная рекомендация: требуется анализ андеррайтера по материалам электронного досье.',
      reasons: ['Рекомендация сформирована в учебном прототипе'],
      createdAt: new Date().toISOString(),
    };
  }
}

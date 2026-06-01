import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PropertyRiskInput, ScoringService } from './scoring.service';

@ApiTags('scoring')
@Controller('scoring')
export class ScoringController {
  constructor(private readonly scoringService: ScoringService) {}

  @Post('calculate')
  @ApiOperation({ summary: 'Расчет скоринговой оценки риска' })
  calculate(@Body() dto: PropertyRiskInput) {
    return this.scoringService.calculate(dto);
  }
}

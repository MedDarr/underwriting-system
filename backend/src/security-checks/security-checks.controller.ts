import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplicantCheckInput, SecurityChecksService } from './security-checks.service';

@ApiTags('security-checks')
@Controller('security-checks')
export class SecurityChecksController {
  constructor(private readonly securityChecksService: SecurityChecksService) {}

  @Post()
  @ApiOperation({ summary: 'Выполнение проверок безопасности' })
  checkApplicant(@Body() dto: ApplicantCheckInput) {
    return this.securityChecksService.checkApplicant(dto);
  }
}

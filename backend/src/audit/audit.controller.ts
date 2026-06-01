import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuditEventInput, AuditService } from './audit.service';

@ApiTags('audit')
@Controller('audit-logs')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  @Post()
  @ApiOperation({ summary: 'Запись события в журнал аудита' })
  write(@Body() dto: AuditEventInput) {
    return this.auditService.write(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Получение полного журнала аудита' })
  findAll() {
    return this.auditService.findAll();
  }

  @Get('application/:applicationId')
  @ApiOperation({ summary: 'История действий по заявке' })
  findByApplication(@Param('applicationId') applicationId: string) {
    return this.auditService.findByApplication(Number(applicationId));
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'История действий пользователя' })
  findByUser(@Param('userId') userId: string) {
    return this.auditService.findByUser(Number(userId));
  }
}

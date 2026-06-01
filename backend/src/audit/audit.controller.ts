import { AuditEventInput, AuditService } from './audit.service';

export class AuditController {
  constructor(private readonly auditService = new AuditService()) {}

  /**
   * POST /audit-logs
   * Запись действия пользователя или системного события в журнал аудита.
   */
  write(dto: AuditEventInput) {
    return this.auditService.write(dto);
  }

  /**
   * GET /audit-logs
   * Получение полного журнала аудита, отсортированного по времени события.
   */
  findAll() {
    return this.auditService.findAll();
  }

  /**
   * GET /audit-logs/application/{applicationId}
   * Получение истории действий по конкретной заявке.
   */
  findByApplication(applicationId: number) {
    return this.auditService.findByApplication(applicationId);
  }

  /**
   * GET /audit-logs/user/{userId}
   * Получение истории действий конкретного пользователя.
   */
  findByUser(userId: number) {
    return this.auditService.findByUser(userId);
  }
}

import { Injectable } from '@nestjs/common';

export interface AuditEventInput {
  userId?: number;
  applicationId?: number;
  actionType: string;
  details?: string;
}

export interface AuditLogView {
  logId: number;
  userId?: number;
  applicationId?: number;
  actionType: string;
  details?: string;
  createdAt: string;
}

@Injectable()
export class AuditService {
  private readonly logs: AuditLogView[] = [];

  write(event: AuditEventInput): AuditLogView {
    const log: AuditLogView = {
      logId: this.logs.length + 1,
      userId: event.userId,
      applicationId: event.applicationId,
      actionType: event.actionType,
      details: event.details,
      createdAt: new Date().toISOString(),
    };

    this.logs.push(log);
    return log;
  }

  findAll(): AuditLogView[] {
    return [...this.logs].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  findByApplication(applicationId: number): AuditLogView[] {
    return this.logs
      .filter((log) => log.applicationId === applicationId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  findByUser(userId: number): AuditLogView[] {
    return this.logs
      .filter((log) => log.userId === userId)
      .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }
}

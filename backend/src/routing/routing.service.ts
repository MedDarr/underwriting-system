import { Injectable } from '@nestjs/common';

export type RiskLevel = 'low' | 'medium' | 'high';
export type RouteStage =
  | 'sales_revision'
  | 'standard_underwriting'
  | 'special_conditions'
  | 'senior_underwriter'
  | 'security_service'
  | 'completed';

export interface RoutingInput {
  applicationId: number;
  riskLevel: RiskLevel;
  dataComplete: boolean;
  blacklistHit: boolean;
  assignedTo?: number;
}

export interface RoutingTaskView {
  taskId: number;
  applicationId: number;
  assignedTo?: number;
  stage: RouteStage;
  status: 'created' | 'in_progress' | 'completed';
  comment: string;
  createdAt: string;
}

@Injectable()
export class RoutingService {
  private tasks: RoutingTaskView[] = [];

  createRoute(input: RoutingInput): RoutingTaskView {
    const stage = this.resolveStage(input);

    const task: RoutingTaskView = {
      taskId: this.tasks.length + 1,
      applicationId: input.applicationId,
      assignedTo: input.assignedTo,
      stage,
      status: 'created',
      comment: this.buildComment(stage),
      createdAt: new Date().toISOString(),
    };

    this.tasks.push(task);
    return task;
  }

  findByApplication(applicationId: number): RoutingTaskView[] {
    return this.tasks.filter((task) => task.applicationId === applicationId);
  }

  completeTask(taskId: number): RoutingTaskView {
    const task = this.tasks.find((item) => item.taskId === taskId);
    if (!task) {
      throw new Error('Routing task not found');
    }

    task.status = 'completed';
    return task;
  }

  private resolveStage(input: RoutingInput): RouteStage {
    if (!input.dataComplete) return 'sales_revision';
    if (input.blacklistHit) return 'security_service';
    if (input.riskLevel === 'low') return 'standard_underwriting';
    if (input.riskLevel === 'medium') return 'special_conditions';
    return 'senior_underwriter';
  }

  private buildComment(stage: RouteStage): string {
    const comments: Record<RouteStage, string> = {
      sales_revision: 'Заявка возвращена специалисту продаж для уточнения данных.',
      standard_underwriting: 'Заявка направлена обычному андеррайтеру.',
      special_conditions: 'Заявка направлена на согласование специальных условий.',
      senior_underwriter: 'Заявка передана старшему андеррайтеру из-за высокого риска.',
      security_service: 'Заявка передана в службу безопасности.',
      completed: 'Маршрут обработки завершен.',
    };

    return comments[stage];
  }
}

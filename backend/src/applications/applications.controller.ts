import { ApplicationsService, ApplicationStatus, CreateApplicationDto } from './applications.service';

export interface ChangeStatusDto {
  status: ApplicationStatus;
}

export class ApplicationsController {
  constructor(private readonly applicationsService = new ApplicationsService()) {}

  /**
   * GET /applications
   * Получение списка заявок на страхование.
   */
  findAll() {
    return this.applicationsService.findAll();
  }

  /**
   * POST /applications
   * Создание новой заявки и присвоение ей статуса registered.
   */
  create(dto: CreateApplicationDto) {
    return this.applicationsService.create(dto);
  }

  /**
   * GET /applications/{id}
   * Получение карточки заявки по идентификатору.
   */
  findById(id: number) {
    const application = this.applicationsService.findById(id);
    if (!application) {
      throw new Error('Application not found');
    }
    return application;
  }

  /**
   * PATCH /applications/{id}/status
   * Изменение статуса заявки на одном из этапов андеррайтинга.
   */
  changeStatus(id: number, dto: ChangeStatusDto) {
    return this.applicationsService.changeStatus(id, dto.status);
  }
}

import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApplicationsService, ApplicationStatus, CreateApplicationDto } from './applications.service';

export class ChangeStatusDto {
  status!: ApplicationStatus;
}

@ApiTags('applications')
@Controller('applications')
export class ApplicationsController {
  constructor(private readonly applicationsService: ApplicationsService) {}

  @Get()
  @ApiOperation({ summary: 'Получение списка заявок' })
  findAll() {
    return this.applicationsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: 'Создание новой заявки' })
  create(@Body() dto: CreateApplicationDto) {
    return this.applicationsService.create(dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получение карточки заявки' })
  findById(@Param('id') id: string) {
    const application = this.applicationsService.findById(Number(id));
    if (!application) {
      throw new Error('Application not found');
    }
    return application;
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Изменение статуса заявки' })
  changeStatus(@Param('id') id: string, @Body() dto: ChangeStatusDto) {
    return this.applicationsService.changeStatus(Number(id), dto.status);
  }
}

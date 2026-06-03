import { Injectable } from '@nestjs/common';

export type ApplicationStatus =
  | 'draft'
  | 'registered'
  | 'checking'
  | 'scoring'
  | 'decision'
  | 'approved'
  | 'approved_special'
  | 'need_info'
  | 'declined';

export interface CreateApplicationDto {
  applicantId: number;
  applicationNumber: string;
  priority?: 'low' | 'normal' | 'high';
  applicantFullName?: string;
  propertyAddress?: string;
  constructionYear?: number;
  wallMaterial?: string;
  heatingType?: string;
  documents?: string[];
}

export interface ApplicationView {
  applicationId: number;
  applicantId: number;
  applicationNumber: string;
  status: ApplicationStatus;
  priority: 'low' | 'normal' | 'high';
  riskLevel?: 'low' | 'medium' | 'high';
  createdAt: string;
}

@Injectable()
export class ApplicationsService {
  private applications: ApplicationView[] = [];

  create(dto: CreateApplicationDto): ApplicationView {
    this.validateCreateDto(dto);

    const application: ApplicationView = {
      applicationId: this.applications.length + 1,
      applicantId: dto.applicantId,
      applicationNumber: dto.applicationNumber,
      status: 'registered',
      priority: dto.priority ?? 'normal',
      createdAt: new Date().toISOString(),
    };

    this.applications.push(application);
    return application;
  }

  findAll(): ApplicationView[] {
    return this.applications;
  }

  findById(applicationId: number): ApplicationView | undefined {
    return this.applications.find((item) => item.applicationId === applicationId);
  }

  changeStatus(applicationId: number, status: ApplicationStatus): ApplicationView {
    const application = this.findById(applicationId);
    if (!application) {
      throw new Error('Application not found');
    }
    application.status = status;
    return application;
  }

  private validateCreateDto(dto: CreateApplicationDto): void {
    if (!dto.applicantId || dto.applicantId <= 0) {
      throw new Error('Applicant is required');
    }

    if (!dto.applicationNumber?.trim()) {
      throw new Error('Application number is required');
    }

    if (dto.constructionYear !== undefined) {
      const currentYear = new Date().getFullYear();
      if (dto.constructionYear < 1850 || dto.constructionYear > currentYear) {
        throw new Error('Construction year is out of allowed range');
      }
    }

    if (dto.documents && dto.documents.length === 0) {
      throw new Error('At least one application document is required');
    }
  }
}

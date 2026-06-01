import { Module } from '@nestjs/common';

import { ApplicationsController } from './applications/applications.controller';
import { ApplicationsService } from './applications/applications.service';
import { SecurityChecksController } from './security-checks/security-checks.controller';
import { SecurityChecksService } from './security-checks/security-checks.service';
import { ScoringController } from './scoring/scoring.controller';
import { ScoringService } from './scoring/scoring.service';
import { RecommendationsController } from './recommendations/recommendations.controller';
import { RecommendationsService } from './recommendations/recommendations.service';
import { RoutingService } from './routing/routing.service';
import { AuditController } from './audit/audit.controller';
import { AuditService } from './audit/audit.service';

@Module({
  controllers: [
    ApplicationsController,
    SecurityChecksController,
    ScoringController,
    RecommendationsController,
    AuditController,
  ],
  providers: [
    ApplicationsService,
    SecurityChecksService,
    ScoringService,
    RecommendationsService,
    RoutingService,
    AuditService,
  ],
})
export class AppModule {}

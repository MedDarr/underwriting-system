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

export class AppModule {
  readonly applicationsService = new ApplicationsService();
  readonly securityChecksService = new SecurityChecksService();
  readonly scoringService = new ScoringService();
  readonly recommendationsService = new RecommendationsService();
  readonly routingService = new RoutingService();
  readonly auditService = new AuditService();

  readonly applicationsController = new ApplicationsController(this.applicationsService);
  readonly securityChecksController = new SecurityChecksController(this.securityChecksService);
  readonly scoringController = new ScoringController(this.scoringService);
  readonly recommendationsController = new RecommendationsController(this.recommendationsService);
  readonly auditController = new AuditController(this.auditService);
}

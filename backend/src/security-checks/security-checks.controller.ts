import { ApplicantCheckInput, SecurityChecksService } from './security-checks.service';

export class SecurityChecksController {
  constructor(private readonly securityChecksService = new SecurityChecksService()) {}

  /**
   * POST /security-checks
   * Выполнение проверки страхователя по черным спискам, истории убытков,
   * предыдущим отказам и неоплаченным полисам.
   */
  checkApplicant(dto: ApplicantCheckInput) {
    return this.securityChecksService.checkApplicant(dto);
  }
}

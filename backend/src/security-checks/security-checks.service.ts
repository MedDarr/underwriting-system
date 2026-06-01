export interface ApplicantCheckInput {
  applicantId: number;
  fullName: string;
  phone?: string;
  email?: string;
  address?: string;
  previousLosses?: number;
  previousDeclines?: number;
  unpaidPolicies?: number;
}

export interface SecurityCheckResultView {
  applicantId: number;
  blacklistHit: boolean;
  lossHistoryCount: number;
  previousDeclines: number;
  unpaidPolicies: number;
  criticalControl: boolean;
  comment: string;
  checkedAt: string;
}

export class SecurityChecksService {
  private readonly blacklistNames = ['Иванов Риск', 'Петров Контроль'];

  checkApplicant(input: ApplicantCheckInput): SecurityCheckResultView {
    const blacklistHit = this.blacklistNames.some((name) =>
      input.fullName.toLowerCase().includes(name.toLowerCase()),
    );

    const lossHistoryCount = input.previousLosses ?? 0;
    const previousDeclines = input.previousDeclines ?? 0;
    const unpaidPolicies = input.unpaidPolicies ?? 0;
    const criticalControl = blacklistHit || previousDeclines > 0 || unpaidPolicies > 0;

    return {
      applicantId: input.applicantId,
      blacklistHit,
      lossHistoryCount,
      previousDeclines,
      unpaidPolicies,
      criticalControl,
      comment: this.buildComment(blacklistHit, lossHistoryCount, previousDeclines, unpaidPolicies),
      checkedAt: new Date().toISOString(),
    };
  }

  private buildComment(
    blacklistHit: boolean,
    lossHistoryCount: number,
    previousDeclines: number,
    unpaidPolicies: number,
  ): string {
    const comments: string[] = [];

    if (blacklistHit) comments.push('Выявлено совпадение по черному списку');
    if (lossHistoryCount > 0) comments.push(`История убытков: ${lossHistoryCount}`);
    if (previousDeclines > 0) comments.push(`Ранее были отказы: ${previousDeclines}`);
    if (unpaidPolicies > 0) comments.push(`Есть неоплаченные полисы: ${unpaidPolicies}`);

    return comments.length > 0 ? comments.join('; ') : 'Критические признаки не выявлены';
  }
}

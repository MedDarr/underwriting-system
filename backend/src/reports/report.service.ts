import { Injectable } from '@nestjs/common';
import { ScoringResultView } from '../scoring/scoring.service';

export interface UnderwritingReportInput {
  applicationId: number;
  applicationNumber: string;
  applicantFullName: string;
  propertyAddress: string;
  decision: 'approved' | 'approved_special' | 'need_info' | 'declined';
  scoring: ScoringResultView;
  underwriterComment?: string;
}

export interface UnderwritingReportView {
  applicationId: number;
  title: string;
  generatedAt: string;
  summary: string;
  exportFileName: string;
  rows: Array<{ label: string; value: string }>;
}

@Injectable()
export class ReportService {
  buildUnderwritingReport(input: UnderwritingReportInput): UnderwritingReportView {
    const generatedAt = new Date().toISOString();
    const exportFileName = `underwriting-report-${input.applicationNumber}.pdf`;

    return {
      applicationId: input.applicationId,
      title: 'Андеррайтерское заключение по заявке',
      generatedAt,
      summary: this.buildSummary(input),
      exportFileName,
      rows: [
        { label: 'Номер заявки', value: input.applicationNumber },
        { label: 'Страхователь', value: input.applicantFullName },
        { label: 'Адрес объекта', value: input.propertyAddress },
        { label: 'Решение', value: this.translateDecision(input.decision) },
        { label: 'Итоговый балл риска', value: String(input.scoring.totalScore) },
        { label: 'Уровень риска', value: input.scoring.riskLevel },
        { label: 'Комментарий андеррайтера', value: input.underwriterComment ?? 'Комментарий не указан' },
      ],
    };
  }

  private buildSummary(input: UnderwritingReportInput): string {
    const factors = input.scoring.factors.map((factor) => factor.factorName).join(', ');
    return `По заявке ${input.applicationNumber} сформировано решение: ${this.translateDecision(input.decision)}. Выявленные факторы риска: ${factors || 'не выявлены'}.`;
  }

  private translateDecision(decision: UnderwritingReportInput['decision']): string {
    const labels: Record<UnderwritingReportInput['decision'], string> = {
      approved: 'Согласовано',
      approved_special: 'Согласовано на специальных условиях',
      need_info: 'Запрошены дополнительные сведения',
      declined: 'Отказано',
    };

    return labels[decision];
  }
}

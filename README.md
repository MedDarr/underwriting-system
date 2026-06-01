# underwriting-system

Программная система поддержки андеррайтинга страхования частных домов физических лиц.

## Назначение

Система предназначена для автоматизации процессов андеррайтинга, оценки риска, формирования рекомендаций, маршрутизации заявок и журналирования действий пользователей.

## Основные модули

- регистрация и обработка заявок;
- электронное досье и документы;
- проверки безопасности и страховой истории;
- скоринговая оценка риска;
- поддержка принятия решения;
- маршрутизация заявок;
- аудит и журналирование действий.

## Технологический стек

- Frontend: React + TypeScript;
- Backend: Node.js + TypeScript;
- Архитектура: NestJS-style;
- Database: PostgreSQL;
- ORM: Prisma;
- Version Control: Git + GitHub.

## Реализованные сервисы

- ApplicationsService
- SecurityChecksService
- ScoringService
- RecommendationsService
- RoutingService
- AuditService

## Реализованные API

- GET /applications
- POST /applications
- GET /applications/{id}
- PATCH /applications/{id}/status
- POST /security-checks
- POST /scoring/calculate
- POST /recommendations
- GET /recommendations/{applicationId}
- POST /audit-logs
- GET /audit-logs

## Структура репозитория

underwriting-system/
├── backend/
│   └── src/
│       ├── applications/
│       ├── security-checks/
│       ├── scoring/
│       ├── recommendations/
│       ├── routing/
│       ├── audit/
│       ├── app.module.ts
│       └── main.ts
├── prisma/
│   └── schema.prisma
├── docs/
├── frontend/
└── tests/

import React from 'react';

const apiMethods = [
  {
    method: 'GET',
    url: '/applications',
    title: 'Получение списка заявок',
    description: 'Возвращает список заявок на страхование частных домов с текущими статусами и уровнем риска.',
  },
  {
    method: 'POST',
    url: '/applications',
    title: 'Создание заявки',
    description: 'Регистрирует новую заявку, присваивает номер и начальный статус.',
  },
  {
    method: 'GET',
    url: '/applications/{id}',
    title: 'Карточка заявки',
    description: 'Возвращает подробные сведения о заявке, страхователе и объекте страхования.',
  },
  {
    method: 'PATCH',
    url: '/applications/{id}/status',
    title: 'Изменение статуса',
    description: 'Изменяет статус заявки на этапе андеррайтинга.',
  },
  {
    method: 'POST',
    url: '/security-checks',
    title: 'Проверки безопасности',
    description: 'Выполняет проверку страхователя по blacklist, истории убытков и предыдущим отказам.',
  },
  {
    method: 'POST',
    url: '/scoring/calculate',
    title: 'Расчет RiskScore',
    description: 'Рассчитывает итоговый балл риска и определяет уровень риска заявки.',
  },
  {
    method: 'POST',
    url: '/recommendations',
    title: 'Формирование рекомендации',
    description: 'Формирует рекомендацию системы на основании скоринга, факторов риска и комплектности документов.',
  },
  {
    method: 'GET',
    url: '/recommendations/{applicationId}',
    title: 'Получение рекомендации',
    description: 'Возвращает рекомендацию по выбранной заявке.',
  },
  {
    method: 'POST',
    url: '/audit-logs',
    title: 'Запись аудита',
    description: 'Фиксирует действие пользователя или системное событие.',
  },
  {
    method: 'GET',
    url: '/audit-logs',
    title: 'Журнал аудита',
    description: 'Возвращает историю действий пользователей и системных событий.',
  },
];

export function ApiPage() {
  return (
    <section className="panel apiPage">
      <h2>API-методы программной системы</h2>
      <p className="muted">
        Раздел имитирует Swagger/API-админку для учебного прототипа. Методы соответствуют backend-контроллерам проекта.
      </p>

      <div className="apiList">
        {apiMethods.map((item) => (
          <article className="apiCard" key={`${item.method}-${item.url}`}>
            <div className="apiHeader">
              <span className={`method ${item.method.toLowerCase()}`}>{item.method}</span>
              <code>{item.url}</code>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

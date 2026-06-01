export const underwritingRules = [
  {
    ruleCode: 'WOOD_WALLS',
    conditionText: 'Деревянный дом',
    weight: 20,
    action: 'Запросить акт осмотра',
  },
  {
    ruleCode: 'STOVE_HEATING',
    conditionText: 'Печное отопление',
    weight: 25,
    action: 'Назначить специальные условия',
  },
  {
    ruleCode: 'OLD_BUILDING',
    conditionText: 'Возраст объекта более 30 лет',
    weight: 15,
    action: 'Дополнительная проверка',
  },
];

console.log('Seed data prepared:', underwritingRules.length);

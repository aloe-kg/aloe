const CURRENCY_FORMATTER = new Intl.NumberFormat('ru-ru')

export function formatCurrency(number: number) {
  return CURRENCY_FORMATTER.format(number)
}

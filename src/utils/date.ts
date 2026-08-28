export function formatDate(date: Date, month: 'short' | 'long' = 'long'): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month,
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);
}

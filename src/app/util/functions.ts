import { format } from 'date-fns';

export function getDayName(dayIndex: number, short = false) {
  const baseSunday = new Date(2024, 0, 7);
  const date = new Date(baseSunday);
  date.setDate(baseSunday.getDate() + dayIndex);

  return format(date, short ? 'EEE' : 'EEEE');
}

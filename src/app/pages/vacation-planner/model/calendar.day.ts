export interface CalendarDay {
  fullDate: string;
  date: number;
  month: 'prev' | 'current' | 'next';
  isWeekend: boolean;
  holiday?: { name: string; type: 'regional' | 'float' };
  floatComp?: { originalDate: string; compensatedDate: string };
}

export function getObjectKeysAndValues<T extends object>(obj: T): [Array<keyof T>, Array<T[keyof T]>] {
    const keys = Object.keys(obj) as Array<keyof T>;
    const values = Object.values(obj) as Array<T[keyof T]>;
    return [keys, values];
  }


export function getShortMonthNames(months: string[]): string[] {
    const shortMonths: string[] = months.map((month) => {
      const date = new Date(2000, parseInt(month) - 1, 1);
      return date.toLocaleString('default', { month: 'short' });
    });
    return shortMonths;
  }


 export function getWeekNames(weeks: string[]): string[] {
    const weekNames: string[] = weeks.map((week) => `Week ${week}`);
    return weekNames;
  }
  
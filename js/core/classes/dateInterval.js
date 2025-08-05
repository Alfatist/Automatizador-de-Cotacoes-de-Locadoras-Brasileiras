export class DateInterval {
  begin;
  beginISOString;
  end;
  endISOString;
  isMonthly;

  constructor(beginDateOrISO, endDateOrISO) {
    let beginISO = beginDateOrISO;
    let endISO = endDateOrISO;

    if (typeof beginISO === Date && endISO === Date) {
      beginISO = DateInterval.getISODateWithOffset(beginISO);
      endISO = DateInterval.getISODateWithOffset(endISO);
    }

    DateInterval.validateISO(beginISO);
    DateInterval.validateISO(endISO);
    this.beginISOString = beginDateOrISO;
    this.endISOString = endDateOrISO;

    this.begin = DateInterval.removeTimezoneOffset(new Date(beginDateOrISO));
    this.end = DateInterval.removeTimezoneOffset(new Date(endDateOrISO));

    this.isMonthly = DateInterval.isIntervalMonthly(this.begin, this.end);

    this.validateInterval();
  }

  static isIntervalMonthly(date1, date2) {
    const dayMs = 1000 * 60 * 60 * 24;

    // Garante que estamos comparando datas sem horas
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const differenceMs = Math.abs(d2 - d1);
    const daysDifference = differenceMs / dayMs;
    console.log(daysDifference);

    return daysDifference >= 30;
  }

  static removeTimezoneOffset(date) {
    if (!(date instanceof Date)) {
      throw new Error("Argument must be a Date object");
    }
    // Adiciona o offset local para "remover" o fuso horário
    return new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);
  }

  validateInterval() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (this.begin < today) {
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      this.begin = today;
      this.end = tomorrow;
    }
    if (this.begin > this.end) {
      this.end.setDate(this.begin.getDate() + 1);
    }

    return;
  }

  static checkIsValid(begin, end) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return begin > today && begin < end ? true : false;
  }

  static getISODateWithOffset(date) {
    const d = new Date(date.getTime() - date.getTimezoneOffset() * 60 * 1000);
    return d.toISOString().split("T")[0];
  }

  static getTodayAndTomorrowISO() {
    const today = new Date();
    const todayISOString = DateInterval.getISODateWithOffset(today);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowISOString = DateInterval.getISODateWithOffset(tomorrow);

    return { today: todayISOString, tomorrow: tomorrowISOString };
  }

  static validateISO(isoString) {
    // Checks for format YYYY-MM-DD
    const isoRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoRegex.test(isoString)) throw Error("Date isn't ISO");
    const date = new Date(isoString);
    // Check if date is valid and matches input (to avoid 2024-02-31 becoming 2024-03-02)
    return !isNaN(date.getTime()) && date.toISOString().slice(0, 10) === isoString;
  }

  static monthsAndDaysAfter(dateEnd, dateBegin = DateInterval.removeTimezoneOffset(new Date())) {
    dateBegin.setHours(0, 0, 0, 0);

    let months = (dateEnd.getFullYear() - dateBegin.getFullYear()) * 12 + (dateEnd.getMonth() - dateBegin.getMonth());
    let days = dateEnd.getDate() - 1;
    if (months == 0) days = dateEnd.getDate() - dateBegin.getDate();

    return { months, days };
  }
}

import { DateInterval } from "../../core/classes/dateInterval.js";
import { PageMovida } from "../classes/PageMovida.js";

export default async function getCotationMovida(location, beginDate, endDate, nickname = "") {
  location = location.trim();
  if (nickname.trim() == "") nickname = location;

  let beginMonthAndDaysDistance = DateInterval.monthsAndDaysAfter(beginDate);
  let endMonthAndDaysDistance = DateInterval.monthsAndDaysAfter(endDate, beginDate);

  const page = new PageMovida();

  await page.openNew();

  await page.fillLocation(location);

  await page.tapDate(beginMonthAndDaysDistance.months, beginMonthAndDaysDistance.days);

  await page.checkFirstHour();

  await page.tapDate(endMonthAndDaysDistance.months, endMonthAndDaysDistance.days, true);

  await page.tapSubmitButton();

  await page.ensurePageCotationShowing();

  let result = await page.getCotations();

  console.log(result);

  await page.dispose();

  result["name"] = nickname;

  return result;
}

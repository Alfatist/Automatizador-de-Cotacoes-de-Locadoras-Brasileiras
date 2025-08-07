import { DateInterval } from "../../core/classes/dateInterval.js";
import { PageLocaliza } from "../classes/PageLocaliza.js";

export default async function getCotationLocaliza(location, beginDate, endDate, nickname = "") {
  location = location.trim();
  if (nickname.trim() == "") nickname = location;
  let beginMonthAndDaysDistance = DateInterval.monthsAndDaysAfter(beginDate);
  let endMonthAndDaysDistance = DateInterval.monthsAndDaysAfter(endDate, beginDate);
  const page = new PageLocaliza();

  await page.openNew();

  await page.fillLocation(location);

  await page.tapDate(beginMonthAndDaysDistance.months, beginMonthAndDaysDistance.days);

  await page.checkFirstHour();

  await page.tapDate(endMonthAndDaysDistance.months, endMonthAndDaysDistance.days);

  await page.tapSubmitButton();

  await page.ensurePageCotationShowing();

  let result = await page.getCotations();

  await page.dispose();

  result["name"] = nickname;
  return result;
}

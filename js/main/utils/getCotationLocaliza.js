import { PageLocaliza } from "../classes/PageLocaliza.js";

export default async function getCotationLocaliza(location, nickname = "") {
  if (nickname.trim() == "") nickname = location;
  const page = new PageLocaliza();

  await page.openNew();

  await page.fillLocation(location);

  await page.checkFirstDate();

  await page.checkFirstHour();

  await page.checkSecondDate();

  await page.checkFirstHour();

  await page.tapSubmitButton();

  await page.ensurePageCotationShowing();

  let result = await page.getCotations();

  await page.dispose();

  result["name"] = nickname;
  return result;
}

import { PageMovida } from "../classes/PageMovida.js";

export default async function getCotationMovida(location, nickname = "") {
  if (nickname.trim() == "") nickname = location;
  const page = new PageMovida();

  await page.openNew();

  await page.fillLocation(location);

  await page.checkFirstDate();

  await page.checkFirstHour();

  await page.checkSecondDate();

  await page.tapSubmitButton();

  await page.ensurePageCotationShowing();

  let result = await page.getCotations();

  await page.dispose();

  result["name"] = nickname;

  return result;
}

import { StorageService } from "../../services.js";
import { SheetBuilder } from "../classes/SheetBuilder.js";

export async function createSheetBlob(cotationsFormatterInstance) {
  let dateInterval = await StorageService.getDateInterval();

  let beginDateFormatted = dateInterval.begin.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  let endDateFormatted = dateInterval.end.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });

  const cotationsLocaliza = cotationsFormatterInstance.cotationsLocaliza;
  const cotationsMovida = cotationsFormatterInstance.cotationsMovida;

  let sheetBuild = new SheetBuilder(cotationsLocaliza, cotationsMovida, dateInterval.begin, dateInterval.end);
  sheetBuild.buildTitle(`Cotações do dia ${beginDateFormatted} - ${endDateFormatted}`);
  sheetBuild.buildHeaderRow();
  sheetBuild.buildValues();

  return await sheetBuild.getBlob();
}

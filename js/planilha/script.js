import { createSheetBlob } from "../main/utils/createSheetAndDownload.js";
import { StorageService } from "../services.js";

const cotationsFormatterInstance = await StorageService.getCotationsFormatter();
if (cotationsFormatterInstance != undefined) {
  let blob = createSheetBlob(cotationsFormatterInstance);
  saveAs(new Blob([blob]), "cotacoes.xlsx");
  // await StorageService.setCotationsFormatter(null);
}
window.close();

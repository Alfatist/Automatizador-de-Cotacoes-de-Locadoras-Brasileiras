import { createSheetBlob } from "../main/utils/createSheetAndDownload.js";
import { StorageService } from "../services.js";

const cotationsFormatterInstance = await StorageService.getCotationsFormatter();
if (cotationsFormatterInstance != undefined) await StorageService.downloadBlob(await createSheetBlob(cotationsFormatterInstance));

window.close();

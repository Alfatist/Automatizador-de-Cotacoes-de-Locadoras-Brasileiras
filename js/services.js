import { DateInterval } from "./core/classes/dateInterval.js";

export class StorageService {
  static async saveFormFields(filiaisArray, checkboxesArray, beginDateISO, endDateISO) {
    console.log("salvei");
    await chrome.storage.local.set({ filiais: filiaisArray, checkboxes: checkboxesArray, beginDateISO: beginDateISO, endDateISO: endDateISO });
  }

  static async getOptions() {
    return await chrome.storage.local.get(["filiais", "checkboxes", "beginDateISO", "endDateISO"]);
  }

  static async setCotationsFormatter(cotationsFormatter) {
    await chrome.storage.local.set({ cotationsFormatted: cotationsFormatter });
  }

  static async getCotationsFormatter() {
    let result = await chrome.storage.local.get(["cotationsFormatted"]);
    return result.cotationsFormatted;
  }

  static async downloadBlob(blob, name = "cotacoes") {
    /* TODO: fazer rodar mesmo sem fileSaver ter rodado no html.
    await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "/js/imports/filesaver.js";
      script.onload = () => {
        console.log("FileSaver.js carregado.");
        resolve();
      };
      script.onerror = () => reject(new Error("Erro ao carregar FileSaver.js"));
      document.head.appendChild(script);
    });

    */

    saveAs(new Blob([blob]), `${name}.xlsx`);
    return await StorageService.setCotationsFormatter(null);
  }

  static async getDateInterval() {
    let result = await chrome.storage.local.get(["beginDateISO", "endDateISO"]);

    let dateInterval = new DateInterval(result.beginDateISO, result.endDateISO);
    return dateInterval;
  }
}

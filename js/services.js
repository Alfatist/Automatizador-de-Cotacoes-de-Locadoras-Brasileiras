export class StorageService {
  static async getOptions() {
    let result = await chrome.storage.local.get(["filiais", "checkboxes"]);
    return { filiais: result.filiais, checkboxes: result.checkboxes };
  }

  static async setOptions(filiais, checkboxes) {
    await chrome.storage.local.set({ filiais, checkboxes });
  }

  static async setCotationsFormatter(cotationsFormatter) {
    await chrome.storage.local.set({ cotationsFormatted: cotationsFormatter });
  }

  static async getCotationsFormatter() {
    let result = await chrome.storage.local.get(["cotationsFormatted"]);
    console.log(result.cotationsFormatted);
    return result.cotationsFormatted;
  }

  /// TODO: fazer rodar mesmo sem fileSaver ter rodado no html.
  static async downloadBlob(blob, name = "cotacoes") {
    /*
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
}

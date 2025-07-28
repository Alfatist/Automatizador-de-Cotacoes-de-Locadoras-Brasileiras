export class StorageService {
  static async getOptions() {
    let result = await chrome.storage.local.get(["filiais", "checkboxes"]);
    return { filiais: result.filiais, checkboxes: result.checkboxes };
  }

  static async setOptions(filiais, checkboxes) {
    await chrome.storage.local.set({ filiais, checkboxes });
  }

  static async setCotationsFormatter(cotationsFormatter) {
    console.log("Aqui");
    console.log(cotationsFormatter);
    await chrome.storage.local.set({ cotationsFormatted: cotationsFormatter });
    console.log("salvo com sucesso");
  }

  static async getCotationsFormatter() {
    let result = await chrome.storage.local.get(["cotationsFormatted"]);
    console.log("here");
    console.log(result);
    return result.cotationsFormatted;
  }
}

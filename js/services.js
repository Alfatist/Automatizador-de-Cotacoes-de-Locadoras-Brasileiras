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
}

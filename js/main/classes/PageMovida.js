import { ScriptsMovida } from "./ScriptsMovida.js";

export class PageMovida {
  isOpen = false;
  id;

  async openNew() {
    let result = await chrome.tabs.create({ url: "https://www.movida.com.br/" });

    this.isOpen = true;
    this.id = result.id;

    return result;
  }

  async fillLocation(location) {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsMovida.fillLocation,
      args: [location],
    });

    console.log("Preenchido local de retirada!");
  }

  async checkFirstDate() {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsMovida.tapFirstDate,
    });

    console.log("Primeira data escolhida com sucesso!");
  }

  async checkFirstHour() {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsMovida.tapFirstHour,
    });

    console.log("Primeira hora escolhida com sucesso!");
  }

  async checkSecondDate() {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsMovida.tapSecondDate,
    });

    console.log("Segunda data escolhida com sucesso!");
  }

  async tapSubmitButton() {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsMovida.tapSubmitButton,
    });

    console.log("Botão de submit clicado com sucesso!");
  }

  async ensurePageCotationShowing() {
    console.log("Executando ensureCotations");

    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsMovida.ensureCotationsPage,
    });

    await this._waitUrlLoad("/reserva/escolha-seu-veiculo");

    console.log("cotação garantida!");

    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsMovida.scrollAllPage,
    });

    console.log("Página de cotações sendo exibida");
  }

  async getCotations() {
    console.log("começando o script...");
    let [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsMovida.convertCotations,
    });

    console.log("Cotações obtidas com sucesso!");

    return result;
  }

  async dispose() {
    await chrome.tabs.remove([this.id]);
    this.id = null;
    this.isOpen = false;
    console.log("Página fechada");
  }

  async _waitUrlLoad(partialUrl) {
    while (true) {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const tab = tabs.find((t) => t.id === this.id);
      if (tab?.url?.includes(partialUrl)) break;
      await new Promise((resolve) => setTimeout(resolve, 500)); // Espera meio segundo
    }
  }
}

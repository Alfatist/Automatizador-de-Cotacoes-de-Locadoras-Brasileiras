import { ScriptsLocaliza } from "./ScriptsLocaliza.js";

export class PageLocaliza {
  isOpen = false;
  id;

  async openNew() {
    let result = await chrome.tabs.create({ url: "https://www.localiza.com/brasil/pt-br" });

    this.isOpen = true;
    this.id = result.id;

    return result;
  }

  async fillLocation(location) {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsLocaliza.fillLocation,
      args: [location],
    });

    console.log("Preenchido local de retirada!");
  }

  async tapDate(monthsLater, daysLater) {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsLocaliza.tapDate,
      args: [monthsLater, daysLater],
    });

    console.log("Data escolhida com sucesso!");
  }

  async checkFirstHour() {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsLocaliza.tapFirstHour,
    });

    console.log("Primeira hora escolhida com sucesso!");
  }

  async tapSubmitButton() {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsLocaliza.tapSubmitButton,
    });

    console.log("Botão de submit clicado com sucesso!");
  }

  async ensurePageCotationShowing() {
    console.log("Garantindo que as cotações aparecerão");

    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsLocaliza.ensureCotationsPage,
    });

    console.log("Cotação garantida! Página de cotações sendo exibida");
  }

  async getCotations() {
    let [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsLocaliza.convertCotations,
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
}

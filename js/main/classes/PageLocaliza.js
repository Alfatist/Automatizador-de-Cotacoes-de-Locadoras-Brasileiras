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

  async checkFirstDate() {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsLocaliza.tapFirstDate,
    });

    console.log("Primeira data escolhida com sucesso!");
  }

  async checkFirstHour() {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsLocaliza.tapFirstHour,
    });

    console.log("Primeira hora escolhida com sucesso!");
  }

  async checkSecondDate() {
    await chrome.scripting.executeScript({
      target: { tabId: this.id },
      func: ScriptsLocaliza.tapSecondDate,
    });

    console.log("Segunda data escolhida com sucesso!");
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

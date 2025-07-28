import { StorageService } from "../services.js";
import { createSheetAndDownload } from "./utils/createSheetAndDownload.js";

let port = chrome.runtime.connect(null);
const button = document.querySelector("#main__button");

export async function main() {
  const hasCotationsSaved = (await StorageService.getCotationsFormatter()) != undefined;

  if (hasCotationsSaved) {
    button.innerText = "Pegar Planilha";
    return button.addEventListener("click", createSheetAndDownload);
  }

  const hasLocals = (await StorageService.getOptions()).filiais != undefined;

  if (hasLocals) {
    button.innerText = "Pegar Cotações";
    button.removeEventListener("click", createSheetAndDownload);
    return button.addEventListener("click", async () => {
      await port.postMessage("começar");
    });
  }

  button.innerText = "Escolher filiais";

  document.querySelector(".main__link").classList.add("hidden");
  return button.addEventListener("click", async () => {
    window.location.href = "../options.html";
  });
}

main();

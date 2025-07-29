import { StorageService } from "../services.js";
import { createSheetBlob } from "./utils/createSheetAndDownload.js";

let port = chrome.runtime.connect(null);
const button = document.querySelector("#main__button");

export async function main() {
  const cotationsFormatter = await StorageService.getCotationsFormatter();

  if (cotationsFormatter != undefined) {
    button.innerText = "Pegar Planilha";
    return button.addEventListener("click", async (e) => {
      await StorageService.downloadBlob(await createSheetBlob(cotationsFormatter));
      main();
    });
  }

  const hasLocals = (await StorageService.getOptions()).filiais != undefined;

  if (hasLocals) {
    button.innerText = "Pegar Cotações";
    button.removeEventListener("click", createSheetBlob);
    return button.addEventListener("click", async () => {
      await port.postMessage("começar");
    });
  }

  button.innerText = "Escolher filiais";

  document.querySelector(".main__link").classList.add("hidden");
  return button.addEventListener("click", async () => {
    window.location.href = "/options.html";
  });
}

main();

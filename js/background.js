import { cotationsFormatter } from "./main/classes/cotationsFormatter.js";
import getCotationLocaliza from "./main/utils/getCotationLocaliza.js";
import getCotationMovida from "./main/utils/getCotationMovida.js";
import { StorageService } from "./services.js";

chrome.runtime.onConnect.addListener((port) => {
  console.log("connected ", port);
  port.onMessage.addListener(scriptPrincipal);
});

async function scriptPrincipal(message, sender, sendResponse) {
  if (message === "começar") {
    let filiais = await StorageService.getOptions();
    filiais = filiais.filiais;
    if (filiais == undefined) return;
    let result = await getCotations(filiais);

    let cotationsFormatted = new cotationsFormatter(result.localizaCotacoes, result.movidaCotacoes);
    await StorageService.setCotationsFormatter(cotationsFormatted);

    chrome.notifications.create("cotacoes-prontas ", {
      type: "basic",
      iconUrl: "../img/localiza.png",
      title: "Cotações salvas",
      message: "Abra a extensão para pegar a planilha :)",
      priority: 2,
    });
  }

  async function getCotations(targets) {
    if (targets == undefined) return;
    let cotationsLocaliza = [];
    let cotationsMovida = [];

    for (let i = 0; i < targets.length; i++) {
      let target = targets[i];
      if (target["empresa"].toLowerCase() == "localiza") {
        cotationsLocaliza.push(await getCotationLocaliza(target["filial"]));
      }
      if (target["empresa"].toLowerCase() == "movida") {
        cotationsMovida.push(await getCotationMovida(target["filial"]));
      }
    }

    return { localizaCotacoes: cotationsLocaliza, movidaCotacoes: cotationsMovida };
  }
}

import { cotationsFormatter } from "./main/classes/cotationsFormatter.js";
import getCotationLocaliza from "./main/utils/getCotationLocaliza.js";
import getCotationMovida from "./main/utils/getCotationMovida.js";
import { StorageService } from "./services.js";

chrome.runtime.onConnect.addListener((port) => {
  console.log("connected ", port);
  port.onMessage.addListener(scriptPrincipal);
});

chrome.notifications.onClicked.addListener((notificationId) => {
  if (notificationId == "cotacoes-prontas") {
    chrome.tabs.create(
      {
        url: chrome.runtime.getURL("/planilha.html"),
      },
      (tab) => {
        // Opcional: enviar mensagem ao novo tab com dados
        chrome.tabs.sendMessage(tab.id, { autorizado: true });
      }
    );
  }
});

async function scriptPrincipal(message, sender, sendResponse) {
  if (message === "começar") {
    let filiais = await StorageService.getOptions();
    filiais = filiais.filiais;
    if (filiais == undefined) return;
    let result = await getCotations(filiais);

    let cotationsFormatted = new cotationsFormatter(result.localizaCotacoes, result.movidaCotacoes);
    await StorageService.setCotationsFormatter(cotationsFormatted);

    chrome.notifications.create("cotacoes-prontas", {
      type: "basic",
      iconUrl: "/img/localiza.png",
      title: "Cotações salvas",
      message: "Abra a extensão para pegar a planilha.\n\nOu então clique nesta notificação :)",
      priority: 2,
    });
  }

  async function getCotations(targets) {
    if (targets == undefined) return;
    let cotationsLocaliza = [];
    let cotationsMovida = [];
    let dates = await StorageService.getDateInterval();
    for (let i = 0; i < targets.length; i++) {
      let target = targets[i];
      if (target["empresa"].toLowerCase() == "localiza") {
        cotationsLocaliza.push(await getCotationLocaliza(target["filial"], dates.begin, dates.end));
      }
      if (target["empresa"].toLowerCase() == "movida") {
        cotationsMovida.push(await getCotationMovida(target["filial"], dates.begin, dates.end));
      }
    }

    return { localizaCotacoes: cotationsLocaliza, movidaCotacoes: cotationsMovida };
  }
}

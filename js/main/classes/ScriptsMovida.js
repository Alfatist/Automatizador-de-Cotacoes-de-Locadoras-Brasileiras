export class ScriptsMovida {
  static fillLocation = async (location) => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query, root = document) {
      let element;
      while (element == undefined) {
        element = root.querySelector(query);
        await wait(500);
      }

      return element;
    }

    async function ensureClick(query, root = document) {
      let element = root.querySelector(query);
      while (element != undefined) {
        const rect = element.getBoundingClientRect();
        element.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: rect.left, clientY: rect.top }));
        element.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, clientX: rect.left, clientY: rect.top }));
        element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, clientX: rect.left, clientY: rect.top }));
        element.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, clientX: rect.left, clientY: rect.top }));
        element.dispatchEvent(new MouseEvent("click", { bubbles: true, clientX: rect.left, clientY: rect.top }));

        await wait(500);
        element = root.querySelector(query, shadowContainer);
      }

      return element;
    }

    let shadowApp = await ensureQuerySelector("app-motor-busca");
    shadowApp = shadowApp.shadowRoot;

    let shadowContainer = await ensureQuerySelector("app-autocomplete", shadowApp);
    shadowContainer = shadowContainer.shadowRoot;

    let input = await ensureQuerySelector("input[name='loja1']", shadowContainer);

    input.click();
    input.focus();

    input.value = location;

    // Dispara eventos para o autocomplete funcionar
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "R", bubbles: true }));

    await ensureClick(".options-list>li", shadowContainer);

    return;
  };

  static tapDate = async (monthsLater, daysLater, isSecond = false) => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query, root = document) {
      let element;
      while (element == undefined) {
        element = root.querySelector(query);
        await wait(500);
      }

      return element;
    }

    async function ensureQuerySelectorAll(query, root = document) {
      let element;
      while (element == undefined || element?.length == 0) {
        element = root.querySelectorAll(query);
        console.log(element);
        await wait(500);
      }

      return element;
    }

    async function ensureQuerySelectorEmpty(query, root = document) {
      let element = document.querySelector(query);
      while (element != undefined) {
        await wait(500);
        element = root.querySelector(query);
      }

      return element;
    }

    let shadowApp = await ensureQuerySelector("app-motor-busca");
    shadowApp = shadowApp.shadowRoot;

    let shadowContainer = await ensureQuerySelector(isSecond ? "app-calendar[name='data_devolucao']" : "app-calendar", shadowApp);
    console.log(shadowContainer);
    console.log("EIIIIIIIIII");
    shadowContainer = shadowContainer.shadowRoot;

    const nextMonthButtonSelector = ".month-year + button";
    const daysSelector = ".day:not(.disabled)";

    for (let i = 0; i < monthsLater; i++) {
      let nextMonthButton = await ensureQuerySelector(nextMonthButtonSelector, shadowContainer);
      nextMonthButton.click();
      await wait(500);
    }
    let days = await ensureQuerySelectorAll(daysSelector, shadowContainer);
    days[daysLater].click();

    await ensureQuerySelectorEmpty(shadowContainer, shadowApp);
  };

  static tapLastHour = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query, root = document) {
      let element;
      while (element == undefined) {
        element = root.querySelector(query);
        await wait(500);
      }

      return element;
    }

    async function ensureQuerySelectorEmpty(query, root = document) {
      let element = document.querySelector(query);
      while (element != undefined) {
        await wait(500);
        element = root.querySelector(query);
      }

      return element;
    }

    async function ensureQuerySelectorAll(query, root = document) {
      let element;
      while (element == undefined) {
        element = root.querySelectorAll(query);

        console.log(element);
        console.log("pega");
        if (element instanceof NodeList && element.length == 0) element = undefined;

        await wait(500);
      }

      return element;
    }

    let shadowApp = await ensureQuerySelector("app-motor-busca");
    shadowApp = shadowApp.shadowRoot;

    let shadowContainer = await ensureQuerySelector("app-custom-select", shadowApp);
    shadowContainer = shadowContainer.shadowRoot;

    const hours = await ensureQuerySelectorAll(".option", shadowContainer);
    const lastHour = hours[hours.length - 1];

    lastHour.click();

    await ensureQuerySelectorEmpty(shadowContainer, shadowApp);
  };

  static tapSubmitButton = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query, root = document) {
      let element;
      while (element == undefined) {
        element = root.querySelector(query);

        await wait(500);
      }

      return element;
    }

    let shadowApp = await ensureQuerySelector("app-motor-busca");
    shadowApp = shadowApp.shadowRoot;

    let button = await ensureQuerySelector("button[type='submit']", shadowApp);
    button.click();
  };

  static ensureCotationsPage = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    while (true) {
      let isCotationExisting = window.location.pathname.endsWith("/escolha-seu-veiculo");
      console.log(isCotationExisting);
      console.log("OIII");
      if (isCotationExisting) break;

      let noAddButton = document.querySelector(".mov-modal__buttons>button");
      if (noAddButton != undefined) {
        noAddButton.click();
        break;
      }

      await wait(2000);
    }
  };

  static scrollAllPage = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    for (let i = 0; i < 5; i++) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth", // ou 'auto' se não quiser animação
      });

      await wait(450);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      await wait(450);
    }
  };
  static convertCotations = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelectorAll(query) {
      let element;
      while (element == undefined || element.length < 2) {
        element = document.querySelectorAll(query);

        await wait(500);
      }

      return element;
    }

    let prices = await ensureQuerySelectorAll(".pay-after .clube-price__value-discount--size_walk");
    let groups = await ensureQuerySelectorAll(".row.veiculo_grupo .grupo");

    let object = {};

    for (let i = 0; i < groups.length && i < prices.length; i++) {
      let group = groups[i].innerText;
      let price = prices[i].innerText;
      object[group] = price;
    }
    return object;
  };
}

/*
export class ScriptsMovida {
  static fillLocation = async (location) => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query, root = document) {
      let element;
      while (element == undefined) {
        element = root.querySelector(query);
        await wait(500);
      }

      return element;
    }

    async function ensureClick(query, root = document) {
      let element = root.querySelector(query);
      while (element != undefined) {
        const rect = element.getBoundingClientRect();
        element.dispatchEvent(new PointerEvent("pointerdown", { bubbles: true, clientX: rect.left, clientY: rect.top }));
        element.dispatchEvent(new PointerEvent("pointerup", { bubbles: true, clientX: rect.left, clientY: rect.top }));
        element.dispatchEvent(new MouseEvent("mousedown", { bubbles: true, clientX: rect.left, clientY: rect.top }));
        element.dispatchEvent(new MouseEvent("mouseup", { bubbles: true, clientX: rect.left, clientY: rect.top }));
        element.dispatchEvent(new MouseEvent("click", { bubbles: true, clientX: rect.left, clientY: rect.top }));

        await wait(500);
        element = root.querySelector(query, shadowContainer);
      }

      return element;
    }

    let shadowApp = await ensureQuerySelector("app-motor-busca");
    shadowApp = shadowApp.shadowRoot;

    let shadowContainer = await ensureQuerySelector("app-autocomplete", shadowApp);
    shadowContainer = shadowContainer.shadowRoot;

    let input = await ensureQuerySelector("input[name='loja1']", shadowContainer);

    input.click();
    input.focus();

    input.value = location;

    // Dispara eventos para o autocomplete funcionar
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "R", bubbles: true }));

    await ensureClick(".options-list>li", shadowContainer);

    return;
  };

  static tapFirstDate = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query, root = document) {
      let element;
      while (element == undefined) {
        element = root.querySelector(query);
        await wait(500);
      }

      return element;
    }

    async function ensureQuerySelectorEmpty(query, root = document) {
      let element = document.querySelector(query);
      while (element != undefined) {
        await wait(500);
        element = root.querySelector(query);
      }

      return element;
    }

    let shadowApp = await ensureQuerySelector("app-motor-busca");
    shadowApp = shadowApp.shadowRoot;

    let shadowContainer = await ensureQuerySelector("app-calendar", shadowApp);
    shadowContainer = shadowContainer.shadowRoot;

    const firstDateSelector = ".actualyDay";
    let firstDate = await ensureQuerySelector(firstDateSelector, shadowContainer);
    firstDate.click();

    await ensureQuerySelectorEmpty(shadowContainer, shadowApp);
  };

  static tapFirstHour = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query, root = document) {
      let element;
      while (element == undefined) {
        element = root.querySelector(query);
        await wait(500);
      }

      return element;
    }

    async function ensureQuerySelectorEmpty(query, root = document) {
      let element = document.querySelector(query);
      while (element != undefined) {
        await wait(500);
        element = root.querySelector(query);
      }

      return element;
    }

    let shadowApp = await ensureQuerySelector("app-motor-busca");
    shadowApp = shadowApp.shadowRoot;

    let shadowContainer = await ensureQuerySelector("app-custom-select", shadowApp);
    shadowContainer = shadowContainer.shadowRoot;

    let elemento = await ensureQuerySelector(".option + .option + .option", shadowContainer);
    elemento.click();

    await ensureQuerySelectorEmpty(shadowContainer, shadowApp);
  };

  static tapSecondDate = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query, root = document) {
      let element;
      while (element == undefined) {
        element = root.querySelector(query);
        await wait(500);
      }

      return element;
    }

    async function ensureQuerySelectorEmpty(query, root = document) {
      let element = document.querySelector(query);
      while (element != undefined) {
        await wait(500);
        element = root.querySelector(query);
      }

      return element;
    }

    let shadowApp = await ensureQuerySelector("app-motor-busca");
    shadowApp = shadowApp.shadowRoot;

    let shadowContainer = await ensureQuerySelector("app-calendar[name='data_devolucao']", shadowApp);
    shadowContainer = shadowContainer.shadowRoot;

    const firstDateSelector = ".actualyDay + .day";

    let firstDate = await ensureQuerySelector(firstDateSelector, shadowContainer);
    firstDate.click();

    await ensureQuerySelectorEmpty(shadowContainer, shadowApp);
  };

  static tapSubmitButton = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query, root = document) {
      let element;
      while (element == undefined) {
        element = root.querySelector(query);

        await wait(500);
      }

      return element;
    }

    let shadowApp = await ensureQuerySelector("app-motor-busca");
    shadowApp = shadowApp.shadowRoot;

    let button = await ensureQuerySelector("button[type='submit']", shadowApp);
    button.click();
  };

  static ensureCotationsPage = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    while (true) {
      let isCotationExisting = window.location.pathname.endsWith("/escolha-seu-veiculo");

      if (isCotationExisting) break;

      let noAddButton = document.querySelector(".mov-modal__buttons>button");
      if (noAddButton != undefined) {
        noAddButton.click();
        break;
      }

      await wait(2000);
    }
  };

  static scrollAllPage = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    for (let i = 0; i < 5; i++) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth", // ou 'auto' se não quiser animação
      });

      await wait(450);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });

      await wait(450);
    }
  };
  static convertCotations = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelectorAll(query) {
      let element;
      while (element == undefined || element.length < 2) {
        element = document.querySelectorAll(query);

        await wait(500);
      }

      return element;
    }

    let prices = await ensureQuerySelectorAll(".pay-after .clube-price__value-discount--size_walk");
    let groups = await ensureQuerySelectorAll(".row.veiculo_grupo .grupo");

    let object = {};

    for (let i = 0; i < groups.length && i < prices.length; i++) {
      let group = groups[i].innerText;
      let price = prices[i].innerText;
      object[group] = price;
    }
    return object;
  };
}
*/

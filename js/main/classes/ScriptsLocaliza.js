export class ScriptsLocaliza {
  static fillLocation = async (location) => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query) {
      let element;
      while (element == undefined) {
        element = document.querySelector(query);
        await wait(500);
      }

      return element;
    }

    let containerInput = await ensureQuerySelector("body");

    const observer = new MutationObserver(async () => {
      let firstLocalSuggested = await ensureQuerySelector(".places-list__item__column");
      firstLocalSuggested.click();
      return;
    });

    observer.observe(containerInput, {
      childList: true,
      subtree: true,
    });

    let input = await ensureQuerySelector("#mat-input-2");

    input.click();
    input.focus();

    input.value = location;

    // Dispara eventos para o autocomplete funcionar
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dispatchEvent(new Event("change", { bubbles: true }));
    input.dispatchEvent(new KeyboardEvent("keydown", { key: "R", bubbles: true }));

    return;
  };

  static tapFirstDate = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query) {
      let element;
      while (element == undefined) {
        element = document.querySelector(query);
        await wait(500);
      }

      return element;
    }

    async function ensureQuerySelectorEmpty(query) {
      let element = document.querySelector(query);
      while (element != undefined) {
        await wait(500);
        element = document.querySelector(query);
      }

      return element;
    }

    const firstDateSelector = ".mat-calendar-body-cell.mat-calendar-body-active";
    let firstDate = await ensureQuerySelector(firstDateSelector);

    firstDate.click();

    await ensureQuerySelectorEmpty(firstDateSelector);
  };

  static tapFirstHour = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query) {
      let element;
      while (element == undefined) {
        element = document.querySelector(query);

        await wait(500);
      }

      return element;
    }

    async function ensureQuerySelectorEmpty(query) {
      let element = document.querySelector(query);
      while (element != undefined) {
        await wait(500);
        element = document.querySelector(query);
      }

      return element;
    }

    let isAlreadyFilled = document.querySelector("#mat-select-value-3 .mat-mdc-select-min-line")?.innerText[0] != undefined;
    if (isAlreadyFilled) return;
    let elemento = await ensureQuerySelector("mat-option:not([aria-disabled='true'])");
    elemento.click();

    await ensureQuerySelectorEmpty("mat-option:not([aria-disabled='true'])");
  };

  static tapSecondDate = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query) {
      let element;
      while (element == undefined) {
        element = document.querySelectorAll(query)[1];
        await wait(500);
      }

      return element;
    }

    async function ensureQuerySelectorEmpty(query) {
      let element = document.querySelector(query);
      while (element != undefined) {
        await wait(500);
        element = document.querySelector(query);
      }

      return element;
    }

    const firstDateSelector = ".mat-calendar-body-cell:not([aria-disabled='true'])";
    let firstDate = await ensureQuerySelector(firstDateSelector);

    firstDate.click();

    await ensureQuerySelectorEmpty(firstDateSelector);
  };

  static tapSubmitButton = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    async function ensureQuerySelector(query) {
      let element;
      while (element == undefined) {
        element = document.querySelector(query);

        await wait(500);
      }

      return element;
    }

    let button = await ensureQuerySelector("button[type='submit']");
    button.click();
  };

  static ensureCotationsPage = async () => {
    function wait(milisseconds) {
      return new Promise((resolve) => {
        setTimeout(resolve, milisseconds);
      });
    }

    let withoutErrorText = true;

    while (true) {
      let cotations = document.querySelectorAll(".box-group-car-content-box-price-value__rate-total");

      let isCotationExisting = cotations?.length > 1;

      if (isCotationExisting) break;

      let noAddButton = document.querySelector(".modal-two-day-incentive__buttons button");

      if (noAddButton != undefined) noAddButton.click();

      if (withoutErrorText && document.body.innerText.includes("Falha ao carregar informações, por favor tente mais tarde.")) {
        alert("Atenção, o erro não foi da extensão. Tente submeter novamente até a página de cotações aparecer.");
        withoutErrorText = false;
      }
      await wait(500);
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

    let prices = await ensureQuerySelectorAll(".box-group-car-content-box-price-value__rate-total");
    let groups = await ensureQuerySelectorAll("h3");

    let object = {};

    for (let i = 0; i < groups.length && i < prices.length; i++) {
      let group = groups[i].nextElementSibling.innerText;
      let price = prices[i].innerText;
      object[group] = price;
    }
    return object;
  };
}

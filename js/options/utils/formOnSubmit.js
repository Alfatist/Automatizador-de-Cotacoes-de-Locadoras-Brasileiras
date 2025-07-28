import { showfeedback } from "./showFeedback.js";

export async function onSubmitForm(e) {
  try {
    e.preventDefault();

    let rowsInputs = document.querySelectorAll("[data-class='local']");
    let localsArrays = [];
    rowsInputs.forEach((row) => {
      const select = row.children[0];
      const input = row.children[1];
      if (input.value?.trim() != "")
        localsArrays.push({
          empresa: select.value,
          filial: input.value,
        });
    });

    let optionsCheckboxes = document.querySelectorAll("[data-class='options__checkbox']");
    let arrayCheckboxesChecked = [];
    optionsCheckboxes.forEach((option) => {
      if (option.checked) {
        arrayCheckboxesChecked.push(option.name);
      }
    });

    await chrome.storage.local.set({ filiais: localsArrays, checkboxes: arrayCheckboxesChecked });

    showfeedback("Configurações salvas com sucesso!", "success");
  } catch {
    showfeedback("Erro ao salvar informações. Tente novamente.", "error");
  }
}

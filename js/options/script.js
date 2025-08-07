import { localOnBlur, localOnInput } from "./utils/localOnInput.js";
import { startForm } from "./utils/startForm.js";

async function main() {
  const optionsForm = document.querySelector("#options__form");

  await startForm(optionsForm);

  let rowsInputs = document.querySelectorAll("[data-class='local']");
  rowsInputs.forEach((row) => {
    row.querySelector("[data-class='local__input'").addEventListener("input", localOnInput);
    row.querySelector("[data-class='local__input'").addEventListener("blur", localOnBlur);
  });
}

main();

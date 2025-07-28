import { Checkboxes } from "../components/Checkboxes.js";
import { LocalRow } from "../components/LocalRow.js";
import { MoreInfoButton } from "../components/MoreInfoButton.js";
import { SubmitButton } from "../components/SubmitButton.js";
import { onSubmitForm } from "./formOnSubmit.js";

export async function startForm(form) {
  const result = await chrome.storage.local.get(["filiais", "checkboxes"]);
  let [filiais, checkboxes] = [result.filiais, result.checkboxes];
  form.innerHTML += LocalRow.render(filiais);
  // form.innerHTML += Checkboxes.render(checkboxes);
  form.innerHTML += MoreInfoButton.render();
  form.innerHTML += SubmitButton.render();
  form.addEventListener("submit", onSubmitForm);
}

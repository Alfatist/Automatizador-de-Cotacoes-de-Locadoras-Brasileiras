import { StorageService } from "../../services.js";
import { DatePickers } from "../components/DatePickers.js";
import { LocalRow } from "../components/LocalRow.js";
import { MoreInfoButton } from "../components/MoreInfoButton.js";
import { SubmitButton } from "../components/SubmitButton.js";
import { onSubmitForm } from "./formOnSubmit.js";

export async function startForm(form) {
  const result = await StorageService.getOptions();

  let [filiais, checkboxes, beginDateISO, endDateISO] = [result.filiais, result.checkboxes, result.beginDateISO, result.endDateISO];

  LocalRow.renders(filiais).forEach((el) => form.appendChild(el));

  // form.innerHTML += Checkboxes.render(checkboxes);
  DatePickers.renders(beginDateISO, endDateISO).forEach((el) => form.appendChild(el));
  form.appendChild(MoreInfoButton.render());

  form.appendChild(SubmitButton.render());

  form.addEventListener("submit", onSubmitForm);
}

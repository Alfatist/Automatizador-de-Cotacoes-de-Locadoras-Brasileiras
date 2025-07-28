import { LocalRow } from "../components/LocalRow.js";

export function localOnInput(event) {
  const input = event.target;
  const isValueEmpty = input.value?.trim() == "";
  const localRowParent = input.parentElement;
  const isNextUncleLocalRow = localRowParent.nextElementSibling.getAttribute("data-class") == "local";
  const localRowNumber = +localRowParent.getAttribute("data-number");

  if (isValueEmpty && isNextUncleLocalRow && localRowNumber != 1) return localRowParent.remove();

  if (!(isValueEmpty || isNextUncleLocalRow)) {
    const element = LocalRow.buildEmpty(localRowNumber + 1, localOnInput);
    return localRowParent.after(element);
  }
}

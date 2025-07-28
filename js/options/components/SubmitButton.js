export class SubmitButton {
  static render() {
    let submit = document.createElement("button");
    submit.type = "submit";
    submit.textContent = "Salvar configurações";
    return submit.outerHTML;
  }
}

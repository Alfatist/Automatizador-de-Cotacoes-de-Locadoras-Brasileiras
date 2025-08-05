import { UtilFunctions } from "../utils/utilFunctions.js";

export class Checkboxes {
  static render(checkboxes) {
    return UtilFunctions.convertStringsToNodeArrays(`<div class="options__checkboxes">
          <label>
            <input type="checkbox" name="analise_planilha" data-class="options__checkbox" ${
              checkboxes?.includes("analise_planilha") ? "checked" : ""
            }  />
            Análise na planilha
          </label>

          <label>
            <input type="checkbox" name="nao_incluir" data-class="options__checkbox" ${checkboxes?.includes("nao_incluir") ? "checked" : null} />
            Não incluir se Localiza não tiver
          </label>
        </div>`);
  }
}

import { UtilFunctions } from "../../helpers/utilFunctions.js";

export class MoreInfoButton {
  static render() {
    return UtilFunctions.convertStringsToNodeArrays(`<label class="main__link" for="shouldShowHelp" style="display: block">Datas e Opções</label>`);
  }
}

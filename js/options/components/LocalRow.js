import { UtilFunctions } from "../../helpers/utilFunctions.js";

export class LocalRow {
  static _getEmptyRow(id) {
    return `<div class="local" id="row${id}" data-class="local" data-number="${id}">
          <select name="row${id}__select" id="select" title="Selecione a empresa">
            <option value="localiza" title="Localiza">&#xe900;</option>
            <option value="movida" title="Movida">&#xe903;</option>
          </select>

          <input type="text" placeholder="Filial" id="row${id}__input" data-class="local__input" />
        </div>`;
  }

  static buildEmpty(id, listenerOnInput) {
    let newRow = this._getEmptyRow(id);

    const temp = document.createElement("div");
    temp.innerHTML = newRow;
    let element = temp.firstElementChild;

    element.querySelector("[data-class='local__input'").addEventListener("input", listenerOnInput);

    return element;
  }

  static renders(filiais) {
    if (filiais == undefined || filiais.length == 0) return [UtilFunctions.convertStringsToNodeArrays(this._getEmptyRow(1))];

    let id = 1;
    let localRows = [];

    filiais.forEach((localRow) => {
      localRows.push(`<div class="local" id="row${id}" data-class="local" data-number="${id}">
          <select name="row${id}__select" id="select" title="Selecione a empresa">
            <option value="localiza" title="Localiza" ${localRow["empresa"] == "localiza" ? "checked" : ""} >&#xe900;</option>
            <option value="movida" title="Movida" ${localRow["empresa"] == "movida" ? "selected" : ""}>&#xe903;</option>
          </select>

          <input type="text" placeholder="Filial" id="row${id}__input" data-class="local__input" value="${localRow["filial"]}" ${
        id == 1 ? "required" : null
      } />
        </div>`);
      ++id;
    });

    localRows.push(this._getEmptyRow(id));

    return UtilFunctions.convertStringsToNodeArrays(localRows);
  }
}

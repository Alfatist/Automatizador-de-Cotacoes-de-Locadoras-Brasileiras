// Depende de ExcelJS

import { cotationsFormatter } from "./cotationsFormatter.js";
import { SheetStyles } from "./SheetStyles.js";

export class SheetBuilder {
  workbook;
  sheet;
  headers = [];
  locals = { localiza: [], movida: [] };
  dates = { begin: "", end: "" };
  correlationsGroup = {};
  cotations = { localiza: [], movida: [] };

  constructor(cotationsLocaliza, cotationsMovida, dateBegin, dateEnd) {
    this.workbook = new ExcelJS.Workbook();
    this.sheet = this.workbook.addWorksheet("Comparativo");
    this.cotations.localiza = cotationsLocaliza;
    this.cotations.movida = cotationsMovida;
    this.locals.localiza = cotationsLocaliza.map((d) => d.name);
    this.locals.movida = cotationsMovida.map((d) => d.name);
    this.dates.begin = dateBegin.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    this.dates.end = dateEnd.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    this.headers = ["Grupo Localiza", ...this.locals.localiza, ...this.locals.movida, "Grupos Movida"];
    this.correlationsGroup = cotationsFormatter.correlationsLocalizaGroups;
  }

  async getBlob() {
    return await this.workbook.xlsx.writeBuffer();
  }

  buildTitle() {
    const title = `Cotações do dia ${this.dates.begin} - ${this.dates.end}`;
    const titleRow = this.sheet.addRow([title]);

    const headersLength = this.headers.length;
    this.sheet.mergeCells(`A1:${String.fromCharCode(64 + headersLength)}1`);

    let titleCell = titleRow.getCell(1);

    Object.assign(titleCell, SheetStyles.titleCell);
  }

  buildHeaderRow() {
    const headerRow = this.sheet.addRow(this.headers);

    // Equivalente a cell.font = SheetStyles.headerCell.font; cell.fill = SheetStyles.headerCell.fill;
    headerRow.eachCell((cell) => Object.assign(cell, SheetStyles.headerCell));

    this.sheet.columns.forEach((col, i) => {
      col.width = this.headers[i].length < 12 ? 12 : this.headers[i].length + 2;
    });
  }

  buildValues() {
    const localizaGroups = Object.keys(this.correlationsGroup);

    for (const grupo of localizaGroups) {
      const row = [grupo];

      // Valores da Localiza
      for (const loc of this.cotations.localiza) {
        row.push(loc[grupo] || "");
      }

      // Valores da Movida
      const movidaGroup = this.correlationsGroup[grupo]?.movida;
      for (const movida of this.cotations.movida) {
        row.push(movida[movidaGroup] || "");
      }

      row.push(movidaGroup || "");
      const dataRow = this.sheet.addRow(row);
      dataRow.eachCell((cell, colNumber) => {
        const isPreco = colNumber > 1 && colNumber <= 1 + this.locals.localiza.length + this.locals.movida.length;
        cell.alignment = { horizontal: isPreco ? "right" : "center", vertical: "middle" };

        cell.border = SheetStyles.dataCell.border;
      });
    }
  }
}

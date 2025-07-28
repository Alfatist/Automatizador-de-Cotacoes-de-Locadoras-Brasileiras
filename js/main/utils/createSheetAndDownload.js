import { StorageService } from "../../services.js";
import { cotationsFormatter } from "../classes/cotationsFormatter.js";
import { main } from "../script.js";

export async function createSheetAndDownload() {
  let builder = await StorageService.getCotationsFormatter();
  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet("Comparativo");

  const localizaData = builder.cotationsLocaliza;
  const movidaData = builder.cotationsMovida;
  const correlations = cotationsFormatter.correlationsLocalizaGroups;
  const locaisLocaliza = localizaData.map((d) => d.name);
  const locaisMovida = movidaData.map((d) => d.name);

  const hoje = new Date();
  const amanha = new Date();
  amanha.setDate(hoje.getDate() + 1);

  const formatar = (data) => data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  const titulo = `Cotações do dia ${formatar(hoje)} - ${formatar(amanha)}`;

  // Adiciona linha de título
  const titleRow = sheet.addRow([titulo]);

  const header = ["Grupo Localiza", ...locaisLocaliza, ...locaisMovida, "Grupo Movida"];

  // Mescla da primeira célula até a última do header
  const totalColunas = header.length;
  sheet.mergeCells(`A1:${String.fromCharCode(64 + totalColunas)}1`);

  // Estilo do título
  let titleCell = titleRow.getCell(1);
  titleCell.font = { bold: true, size: 24 };
  titleCell.border = {
    top: { style: "thin" },
    bottom: { style: "thin" },
    left: { style: "thin" },
    right: { style: "thin" },
  };
  titleCell.alignment = { horizontal: "center", vertical: "middle" };

  // Cabeçalho
  const headerRow = sheet.addRow(header);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD9D9D9" }, // cinza claro
    };
    cell.border = {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
  });

  sheet.columns.forEach((col, i) => {
    col.width = header[i].length < 12 ? 12 : header[i].length + 2;
  });

  const gruposLocaliza = Object.keys(correlations);

  for (const grupo of gruposLocaliza) {
    const row = [grupo];

    // Valores da Localiza
    for (const loc of localizaData) {
      row.push(loc[grupo] || "");
    }

    // Valores da Movida
    const grupoMovida = correlations[grupo]?.movida;
    for (const movida of movidaData) {
      row.push(movida[grupoMovida] || "");
    }

    row.push(grupoMovida || "");
    const dataRow = sheet.addRow(row);
    dataRow.eachCell((cell, colNumber) => {
      const isPreco = colNumber > 1 && colNumber <= 1 + locaisLocaliza.length + locaisMovida.length;
      cell.alignment = { horizontal: isPreco ? "right" : "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      };
    });
  }

  // Estilização leve
  sheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { horizontal: "center" };
  });
  sheet.columns.forEach((col) => (col.width = 15));

  // Geração do arquivo no navegador
  const blob = await workbook.xlsx.writeBuffer();
  saveAs(new Blob([blob]), "cotacoes.xlsx");
  await StorageService.setCotationsFormatter(null);
  main();
}

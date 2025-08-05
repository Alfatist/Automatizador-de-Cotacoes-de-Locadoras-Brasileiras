export class SheetStyles {
  static titleCell = {
    font: { bold: true, size: 16 },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
  };

  static headerCell = {
    font: { bold: true },
    fill: {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFD9D9D9" }, // cinza claro
    },
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
    alignment: { horizontal: "center", vertical: "middle" },
  };

  static dataCell = {
    border: {
      top: { style: "thin" },
      bottom: { style: "thin" },
      left: { style: "thin" },
      right: { style: "thin" },
    },
  };
}

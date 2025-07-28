export class cotationsFormatter {
  cotationsLocaliza = [];
  cotationsMovida = [];
  static correlationsLocalizaGroups = {
    B: { movida: "AX" },
    C: { movida: "B" },
    CE: { movida: "BX" },
    CS: { movida: "BS" },
    FH: { movida: "C" },
    FS: { movida: "F" },
    FX: { movida: "D" },
    GC: { movida: "H" },
    GX: { movida: "HW" },
    L: { movida: "QX" },
    LE: { movida: "HY" },
    RX: { movida: "K" },
    V: { movida: "L" },
    NX: { movida: "SS" },
    U: { movida: "M" },
    P: { movida: "SY" },
    GR: { movida: "KX" },
    GY: { movida: "HZ" },
  };

  constructor(cotationsLocalizaArray, cotationsMovidaArray) {
    cotationsLocalizaArray.forEach((cotationJson) => {
      this.cotationsLocaliza.push(this.formatCotationJson(cotationJson));
    });

    cotationsMovidaArray.forEach((cotationJson) => {
      this.cotationsMovida.push(this.formatCotationJson(cotationJson));
    });

    console.log(this.cotationsLocaliza);
    console.log(this.cotationsMovida);
  }

  formatCotationJson(json) {
    let keys = Object.keys(json);
    let formattedCotation = {};
    keys.forEach((key) => {
      let oneWordGroup = this.formatGroupToOneWord(key);
      formattedCotation[oneWordGroup] = json[key];
    });

    return formattedCotation;
  }

  formatGroupToOneWord(group) {
    let groupSplit = group.split(" ");
    return groupSplit.length > 1 ? groupSplit[1] : groupSplit[0];
  }
}

/* [
    {
        "B": "309,95",
        "CE": "324,95",
        "FH": "483,95",
        "FX": "510,09",
        "GC": "506,08",
        "GH": "811,63",
        "name": "Gávea"
    },
    {
        "B": "309,95",
        "CE": "324,95",
        "CS": "342,90",
        "FH": "483,95",
        "FX": "510,09",
        "GC": "506,08",
        "name": "Botafogo"
    }
]

[
    {
        "AX": "159,64 ",
        "BS": "185,10 ",
        "BX": "164,25 ",
        "E": "366,01 ",
        "F": "229,60 ",
        "FX": "249,38 ",
        "H": "241,83 ",
        "SS": "737,33 ",
        "name": "Barra da Tijuca"
    }
]

*/

export class UtilFunctions {
  static convertStringsToNodeArrays(stringOrArray) {
    if (typeof stringOrArray === "string") {
      const template = document.createElement("template");
      template.innerHTML = stringOrArray.trim();
      return template.content.firstChild;
    }

    return stringOrArray.map((str) => {
      const template = document.createElement("template");
      template.innerHTML = str.trim();
      return template.content.firstChild;
    });
  }
}

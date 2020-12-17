import { TEMPLATE } from "../common/common-const.js";

export default class View {
  constructor(containerID) {
    this.containerID = containerID;
  }

  setSelectorByID(id, [...list]) {
    const selector = document.getElementById(id);
    let selectorInnerHTML = this._makeSelectorOption(list);
    selector.innerHTML = `
    ${TEMPLATE.SELECTOR_DEFAULT_OPTION}
    ${selectorInnerHTML}
    `;
  }
  setInnerHTMLByID(id, contents) {
    const container = document.getElementById(id);
    container.innerHTML = contents;
  }
  makeButtonByClassName(uniqueID, buttonText, className) {
    return `
    <td>
      <button class="${className}" data-name="${uniqueID}">${buttonText}</button>
    </td>
    `;
  }
  clearInputByID(id) {
    const input = document.getElementById(id);
    input.value = "";
  }

  _makeSelectorOption([...list]) {
    let selectorOption = "";
    list.forEach((element) => {
      selectorOption += `<option value="${element}">${element}</option>`;
    });
    return selectorOption;
  }
}

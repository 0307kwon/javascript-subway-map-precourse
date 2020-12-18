import View from "./view.js";
import { TEMPLATE, LINE_MANAGER } from "../common/common-const.js";

export default class LineManagerView extends View {
  constructor(containerID) {
    super(containerID);
  }
  setInitialView() {
    const container = document.getElementById(this.containerID);
    container.innerHTML = TEMPLATE.LINE_MANAGER;
  }
  setStartStationSelector([...list]) {
    this.setSelectorByID(LINE_MANAGER.START_SELECTOR_ID, list);
  }
  setEndStationSelector([...list]) {
    this.setSelectorByID(LINE_MANAGER.END_SELECTOR_ID, list);
  }
  setTable([...lists]) {
    let tableContents = TEMPLATE.LINE_TABLE_HEADER;
    lists.forEach(([...list]) => {
      tableContents += this._makeTableRow(
        LINE_MANAGER.DELETE_BUTTON_CLASS,
        list
      );
    });
    this.setInnerHTMLByID(LINE_MANAGER.TABLE_ID, tableContents);
  }
  clearInput() {
    this.clearInputByID(LINE_MANAGER.NAME_INPUT_ID);
  }

  _makeTableRow(className, [name, ...elements]) {
    const list = [name, ...elements];
    let tableInnerHTML = "";
    list.forEach((element) => {
      tableInnerHTML += `<td>${element}</td>`;
    });
    tableInnerHTML += this.makeButtonByClassName(name, "삭제", className);
    return `
    <tr>${tableInnerHTML}</tr>
    `;
  }
}

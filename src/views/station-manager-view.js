import View from "./view.js";
import { TEMPLATE, STATION_MANAGER } from "../common/common-const.js";

export default class StationManagerView extends View {
  constructor(containerID) {
    super(containerID);
  }
  setInitialView() {
    const container = document.getElementById(this.containerID);
    container.innerHTML = TEMPLATE.STATION_MANAGER;
  }
  setTable([...lists]) {
    let tableContents = TEMPLATE.STATION_TABLE_HEADER;
    lists.forEach(([...list]) => {
      tableContents += this._makeTableRow(
        STATION_MANAGER.DELETE_BUTTON_CLASS,
        list
      );
    });
    this.setInnerHTMLByID(STATION_MANAGER.TABLE_ID, tableContents);
  }
  clearInput() {
    this.clearInputByID(STATION_MANAGER.NAME_INPUT_ID);
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

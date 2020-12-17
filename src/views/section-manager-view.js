import { SECTION_MANAGER, TEMPLATE } from "../common/common-const.js";
import View from "./view.js";

export default class SectionManagerView extends View {
  constructor(containerID) {
    super(containerID);
  }
  setInitialView() {
    const container = document.getElementById(this.containerID);
    container.innerHTML = TEMPLATE.SECTION_MANAGER;
  }
  setLineSelectButtons([...lineNames]) {
    const container = document.getElementById(
      SECTION_MANAGER.BUTTON_CONTAINER_ID
    );
    let containerInnerHTML = "";
    lineNames.forEach((lineName) => {
      containerInnerHTML += this.makeButtonByClassName(
        lineName,
        lineName,
        SECTION_MANAGER.LINE_SELECT_BUTTON_CLASS
      );
    });
    container.innerHTML = containerInnerHTML;
  }

  setSectionManagerContainer() {
    const container = document.getElementById(
      SECTION_MANAGER.MANAGER_CONTAINER_ID
    );
    container.innerHTML = TEMPLATE.SECTION_MANAGER_CONTAINER;
  }
  setSectionManagerSelector(stationNames) {
    this.setSelectorByID(SECTION_MANAGER.STATION_SELECTOR_ID, stationNames);
  }
  setTable([...lists]) {
    let tableContents = TEMPLATE.SECTION_TABLE_HEADER;
    lists.forEach(([...list]) => {
      tableContents += this._makeTableRow(
        SECTION_MANAGER.DELETE_BUTTON_CLASS,
        list
      );
    });
    this.setInnerHTMLByID(SECTION_MANAGER.TABLE_ID, tableContents);
  }

  _makeTableRow(className, [order, name]) {
    const list = [order, name];
    let tableInnerHTML = "";
    list.forEach((element) => {
      tableInnerHTML += `<td>${element}</td>`;
    });
    tableInnerHTML += this.makeButtonByClassName(
      name,
      "노선에서 제거",
      className
    );
    return `
    <tr>${tableInnerHTML}</tr>
    `;
  }
}

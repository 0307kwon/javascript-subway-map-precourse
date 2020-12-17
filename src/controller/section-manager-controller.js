import { CONFIRM_MESSAGE, SECTION_MANAGER } from "../common/common-const.js";
import Controller from "./controller.js";

export default class SectionManagerController extends Controller {
  constructor(view, models) {
    super(view, models);
    this.lineToManage = null;
    this.updateInitialView();
    this._addEventToAllLineSelectButtons();
  }
  updateInitialView() {
    this._view.setInitialView();
    this.updateLineSelectButtons();
  }
  updateLineSelectButtons() {
    const lines = this._models.linesModel.getLines();
    const processedLines = lines.map((line) => {
      return line.name;
    });
    this._view.setLineSelectButtons(processedLines);
  }
  updateSectionManagerContainer(line) {
    this.lineToManage = line;
    this._view.setSectionManagerContainer();
    this.updateContents();
    this._addEventToRegisterButton();
    this._addEventToAllDeleteButton();
  }
  updateContents() {
    this._updateSectionManagerSelector(this.lineToManage);
    this._updateSectionManagerTable(this.lineToManage);
  }

  _updateSectionManagerTable() {
    const stationsOfLine = this.lineToManage.stations.map(
      (stationName, index) => {
        return [index, stationName];
      }
    );
    this._view.setTable(stationsOfLine);
  }
  _updateSectionManagerSelector() {
    let stations = this._models.stationsModel.getStationsByCondition(
      (station) => {
        return !this.lineToManage.stations.some((stationNameOfLine) => {
          return station.name === stationNameOfLine;
        });
      }
    );
    stations = stations.map((station) => station.name);
    this._view.setSectionManagerSelector(stations);
  }
  _addEventToAllLineSelectButtons() {
    this.addClickEventByID(SECTION_MANAGER.BUTTON_CONTAINER_ID, (event) => {
      if (event.target.className !== SECTION_MANAGER.LINE_SELECT_BUTTON_CLASS) {
        return;
      }
      const lineName = event.target.dataset.name;
      const line = this._models.linesModel.getOneLineByName(lineName);
      this.updateSectionManagerContainer(line);
    });
  }
  _addEventToRegisterButton() {
    this.addClickEventByID(
      SECTION_MANAGER.REGISTER_SECTION_BUTTON_ID,
      this._callbackOfRegisterButton.bind(this)
    );
  }
  _addEventToAllDeleteButton() {
    this.addClickEventByID(SECTION_MANAGER.TABLE_ID, (event) => {
      if (event.target.className !== SECTION_MANAGER.DELETE_BUTTON_CLASS) {
        return;
      }
      if (!confirm(CONFIRM_MESSAGE.DELETE_CONFIRM)) {
        return;
      }
      try {
        const stationName = event.target.dataset.name;
        this._models.linesModel.deleteSection(this.lineToManage, stationName);
        this.updateContents();
      } catch (error) {
        alert(error);
      }
    });
  }
  _callbackOfRegisterButton() {
    const indexToAdd = this.getInputTextByID(SECTION_MANAGER.ORDER_INPUT_ID);
    const selectedStation = this.getSelectorOptionByID(
      SECTION_MANAGER.STATION_SELECTOR_ID
    );
    try {
      this._models.linesModel.addSection(
        this.lineToManage,
        selectedStation,
        indexToAdd
      );
      this.updateContents();
    } catch (error) {
      alert(error);
    }
  }
}

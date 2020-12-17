import { CONFIRM_MESSAGE, LINE_MANAGER } from "../common/common-const.js";
import Controller from "./controller.js";

export default class LineManagerController extends Controller {
  constructor(view, models) {
    super(view, models);
    this._updateInitialView();
    this._addEventToAddButton();
    this._addEventToAllDeleteButtons();
  }

  _updateInitialView() {
    this._view.setInitialView();
    this._updateTable(this._models.linesModel.getLines());
    this._updateSelector();
  }
  _updateSelector() {
    const stations = this._models.stationsModel.getStations();
    const stationNames = stations.map((station) => station.name);
    this._view.setStartStationSelector(stationNames);
    this._view.setEndStationSelector(stationNames);
  }
  _updateTable(lines) {
    const processedLines = lines.map((line) => {
      return [
        line.name,
        line.stations[0],
        line.stations[line.stations.length - 1],
      ];
    });
    this._view.setTable(processedLines);
  }
  _addEventToAddButton() {
    this.addClickEventByID(LINE_MANAGER.ADD_BUTTON_ID, () => {
      try {
        const lines = this._models.linesModel.addLine(
          this.getInputTextByID(LINE_MANAGER.NAME_INPUT_ID),
          this.getSelectorOptionByID(LINE_MANAGER.START_SELECTOR_ID),
          this.getSelectorOptionByID(LINE_MANAGER.END_SELECTOR_ID)
        );
        this._updateTable(lines);
        this._view.clearInput();
      } catch (error) {
        alert(error);
      }
    });
  }
  _addEventToAllDeleteButtons() {
    this.addClickEventByID(LINE_MANAGER.TABLE_ID, (event) => {
      if (event.target.className !== LINE_MANAGER.DELETE_BUTTON_CLASS) {
        return;
      }
      if (!confirm(CONFIRM_MESSAGE.DELETE_CONFIRM)) {
        return;
      }
      const name = event.target.dataset.name;
      const lines = this._models.linesModel.deleteLine(name);
      this._updateTable(lines);
    });
  }
}

import { CONFIRM_MESSAGE, STATION_MANAGER } from "../common/common-const.js";
import Controller from "./controller.js";

export default class StationManagerController extends Controller {
  constructor(view, models) {
    super(view, models);
    this._updateInitialView();
    this._addEventToAddButton();
    this._addEventToAllDeleteButtons();
  }

  _updateInitialView() {
    this._view.setInitialView();
    this._updateTable(this._models.stationsModel.getStations());
  }
  _updateTable(stations) {
    const processedStations = stations.map((station) => {
      return [station.name];
    });
    this._view.setTable(processedStations);
  }
  _addEventToAddButton() {
    this.addClickEventByID(STATION_MANAGER.ADD_BUTTON_ID, () => {
      try {
        const stations = this._models.stationsModel.addStation(
          this.getInputTextByID(STATION_MANAGER.NAME_INPUT_ID)
        );
        this._updateTable(stations);
        this._view.clearInput();
      } catch (error) {
        alert(error);
      }
    });
  }
  _addEventToAllDeleteButtons() {
    this.addClickEventByID(STATION_MANAGER.TABLE_ID, (event) => {
      if (event.target.className !== STATION_MANAGER.DELETE_BUTTON_CLASS) {
        return;
      }
      if (!confirm(CONFIRM_MESSAGE.DELETE_CONFIRM)) {
        return;
      }
      try {
        const stationName = event.target.dataset.name;
        this._models.linesModel.hasValidStationToDelete(stationName);
        const stations = this._models.stationsModel.deleteStation(stationName);
        this._updateTable(stations);
      } catch (error) {
        alert(error);
      }
    });
  }
}

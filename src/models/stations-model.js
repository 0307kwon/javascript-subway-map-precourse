import { INPUT_LIMIT, ERROR_MESSAGE } from "../common/common-const.js";
import Station from "./objects/station.js";

export default class StationsModel {
  constructor() {
    this._stations = [];
  }
  addStation(name) {
    this.hasValidStationInput(name);
    this._stations.push(new Station(name));
    return this._stations;
  }
  deleteStation(targetName) {
    const indexToDelete = this._stations.findIndex((station) => {
      return station.name === targetName;
    });
    this._stations.splice(indexToDelete, 1);
    return this._stations;
  }
  getStations() {
    return this._stations;
  }
  getStationsByCondition(condition) {
    const stationsToSatisfyCondition = [];
    this._stations.forEach((station) => {
      if (condition(station)) {
        stationsToSatisfyCondition.push(station);
      }
    });
    return stationsToSatisfyCondition;
  }
  hasValidStationInput(stationName) {
    if (stationName.length < INPUT_LIMIT.MIN_STATION_NAME_LENGTH) {
      throw ERROR_MESSAGE.MIN_STATION_NAME_LENGTH;
    }
    if (this._hasOverlapStationName(stationName)) {
      throw ERROR_MESSAGE.HAS_OVERLAP_STATION_NAME;
    }
  }

  _hasOverlapStationName(stationName) {
    return this._stations.some((station) => {
      return station.name === stationName;
    });
  }
}

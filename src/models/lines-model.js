import { ERROR_MESSAGE, INPUT_LIMIT } from "../common/common-const.js";
import Line from "../objects/line.js";

export default class LinesModel {
  constructor() {
    this._lines = [];
  }
  addLine(name, startStationName, endStationName) {
    this.hasValidLineInput(name, startStationName, endStationName);
    this._lines.push(new Line(name, startStationName, endStationName));
    return this._lines;
  }
  addSection(targetLine, stationName, indexToAdd) {
    if (stationName === "none") {
      throw ERROR_MESSAGE.NOT_SELECTED_OPTION;
    }
    if (String(indexToAdd) === "") {
      throw ERROR_MESSAGE.NOT_NUMBER_INPUT;
    }
    if (indexToAdd < INPUT_LIMIT.MIN_ORDER_INDEX) {
      throw ERROR_MESSAGE.NOT_MIN_ORDER_INDEX;
    }
    targetLine.stations.splice(indexToAdd, 0, stationName);
  }
  deleteLine(targetName) {
    const targetIndex = this._lines.findIndex((line) => {
      return line.name === targetName;
    });
    this._lines.splice(targetIndex, 1);
    return this._lines;
  }
  deleteSection(targetLine, targetStationName) {
    if (targetLine.stations.length <= INPUT_LIMIT.MIN_STATIONS_OF_LINE) {
      throw ERROR_MESSAGE.MIN_STATIONS_OF_LINE;
    }
    const targetIndex = targetLine.stations.findIndex((stationName) => {
      return stationName === targetStationName;
    });
    targetLine.stations.splice(targetIndex, 1);
  }
  getLines() {
    return this._lines;
  }
  getOneLineByName(targetName) {
    const targetLine = this._lines.find((line) => {
      return line.name === targetName;
    });
    return targetLine;
  }
  hasValidLineInput(name, startStationName, endStationName) {
    if (name.length < INPUT_LIMIT.MIN_LINE_NAME_LENGTH) {
      throw ERROR_MESSAGE.MIN_LINE_NAME_LENGTH;
    }
    if (startStationName === "none" || endStationName === "none") {
      throw ERROR_MESSAGE.NOT_SELECTED_OPTION;
    }
    if (startStationName === endStationName) {
      throw ERROR_MESSAGE.START_STATION_SAME_TO_END;
    }
    if (this._hasOverlapStationName(name)) {
      throw ERROR_MESSAGE.HAS_OVERLAP_LINE_NAME;
    }
  }
  hasValidStationToDelete(targetStationName) {
    for (let line of this._lines) {
      const isStationNameAmongLines = line.stations.some((stationName) => {
        return stationName === targetStationName;
      });
      if (isStationNameAmongLines) {
        throw ERROR_MESSAGE.HAS_VALID_STATION_TO_DELETE;
      }
    }
    return false;
  }

  _hasOverlapStationName(lineName) {
    return this._lines.some((line) => {
      return line.name === lineName;
    });
  }
}

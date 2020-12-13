export default class StationINFOManager {
  constructor() {
    this.stations_ = [];
    this.lines_ = [];
  }

  addNewStation({ name }) {
    const newStation = {
      name: name,
      linesOfStation: new Set(),
    };
    this.stations_.push(newStation);
  }
  addNewLine({ lineName, startStationName, endStationName }) {
    const startStationPtr = this.getPointerFromStationsArray_(startStationName);
    const endStationPtr = this.getPointerFromStationsArray_(endStationName);
    const newLine = {
      name: lineName,
      stationsOfLine: [startStationPtr, endStationPtr],
    };
    startStationPtr.linesOfStation.add(lineName);
    endStationPtr.linesOfStation.add(lineName);
    this.lines_.push(newLine);
  }
  registerStationToLine(lineName, orderToRegister, stationName) {
    const targetLine = this.getOneLineINFOByCondition((line) => {
      return line.name === lineName;
    });
    const targetStation = this.getOneStationINFOByCondition((station) => {
      return station.name === stationName;
    });
    targetLine.stationsOfLine.splice(orderToRegister, 0, targetStation);
    targetStation.linesOfStation.add(lineName);
  }
  getStationsNames() {
    const stationNames = [];
    this.stations_.forEach(({ name }) => {
      stationNames.push(name);
    });
    return stationNames;
  }
  getOneStationINFOByCondition(condition) {
    for (let station of this.stations_) {
      if (condition(station)) {
        return station;
      }
    }
    return -1;
  }
  getStationNamesByCondition(condition) {
    const returnStations = [];
    this.stations_.forEach((station) => {
      if (condition(station)) {
        returnStations.push(station.name);
      }
    });
    return returnStations;
  }
  getLineINFOs() {
    const linesINFOs = [];
    this.lines_.forEach(({ name, stationsOfLine }) => {
      linesINFOs.push({
        name: name,
        stationsOfLine: stationsOfLine,
      });
    });
    return linesINFOs;
  }
  getOneLineINFOByCondition(condition) {
    for (let line of this.lines_) {
      if (condition(line)) {
        return line;
      }
    }
    return -1;
  }
  getLineINFOsByCondition(condition) {
    const returnlines = [];
    this.lines_.forEach((line) => {
      if (condition(line)) {
        returnlines.push(line);
      }
    });
    return returnlines;
  }
  deleteStation(nameToDelete) {
    const stationIndexToDelete = this.stations_.findIndex(({ name }) => {
      return nameToDelete === name;
    });
    if (stationIndexToDelete === -1) {
      return;
    }
    this.stations_.splice(stationIndexToDelete, 1);
  }
  deleteLine(nameToDelete) {
    const lineIndexToDelete = this.lines_.findIndex(({ name }) => {
      return nameToDelete === name;
    });
    if (lineIndexToDelete === -1) {
      return;
    }
    this.deleteLineINFOInAllStations_(this.lines_[lineIndexToDelete]);
    this.lines_.splice(lineIndexToDelete, 1);
  }
  deleteSection(targetStationName, targetLineName) {
    this.deleteLineInStation_(targetStationName, targetLineName);
    this.deleteStationInLine_(targetStationName, targetLineName);
  }
  isNotOverlapNameInStationsArray(inputName) {
    const isValid = this.isNotOverlapName_(this.stations_, inputName);
    if (!isValid) {
      alert(OVERLAP_STATION_ERROR_MESSAGE);
    }
    return isValid;
  }
  isNotOverlapNameInLinesArray(inputName) {
    const isValid = this.isNotOverlapName_(this.lines_, inputName);
    if (!isValid) {
      alert(OVERLAP_LINE_ERROR_MESSAGE);
    }
    return isValid;
  }

  //private
  isNotOverlapName_(targetToFindOverlap, inputName) {
    const overlapIndex = targetToFindOverlap.findIndex(
      ({ name }) => name === inputName
    );
    return overlapIndex === -1;
  }
  deleteLineInStation_(targetStationName, targetLineName) {
    const targetStation = this.getOneStationINFOByCondition((station) => {
      return station.name === targetStationName;
    });
    targetStation.linesOfStation.delete(targetLineName);
  }
  deleteStationInLine_(targetStationName, targetLineName) {
    const targetLine = this.getOneLineINFOByCondition((line) => {
      return line.name === targetLineName;
    });
    const targetStationIndex = targetLine.stationsOfLine.findIndex(
      (stationName) => {
        return stationName === targetStationName;
      }
    );
    targetLine.stationsOfLine.splice(targetStationIndex, 1);
  }
  deleteLineINFOInAllStations_(lineToDelete) {
    const { name, stationsOfLine } = lineToDelete;
    stationsOfLine.forEach((station) => {
      station.linesOfStation.delete(name);
    });
  }
  getPointerFromStationsArray_(targetName) {
    const targetIndex = this.stations_.findIndex(({ name }) => {
      return name === targetName;
    });
    return this.stations_[targetIndex];
  }
}

const OVERLAP_STATION_ERROR_MESSAGE = "기존 역 이름과 중복되는 이름입니다.";
const OVERLAP_LINE_ERROR_MESSAGE = "기존 노선 이름과 중복되는 이름입니다.";

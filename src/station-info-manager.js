export default class StationINFOManager {
  constructor() {
    this._stations = [];
    this._lines = [];
    //this._loadAllFromLocalStorage();
  }
  addNewStation({ name }) {
    const newStation = {
      name: name,
      linesOfStation: new Set(),
    };
    this._stations.push(newStation);
    this._saveAllToLocalStorage();
    console.log(this._stations);
    console.log(this._lines);
  }
  addNewLine({ lineName, startStationName, endStationName }) {
    const newLine = {
      name: lineName,
      stationsOfLine: [startStationName, endStationName],
    };
    const startStation = this.getOneStationINFOByName(startStationName);
    const endStation = this.getOneStationINFOByName(endStationName);
    this._lines.push(newLine);
    startStation.linesOfStation.add(lineName);
    endStation.linesOfStation.add(lineName);
    this._saveAllToLocalStorage();
  }
  registerStationToLine(lineName, orderToRegister, stationName) {
    const targetLine = this.getOneLineByCondition((line) => {
      return line.name === lineName;
    });
    const targetStation = this.getOneStationINFOByName(stationName);
    targetLine.stationsOfLine.splice(orderToRegister, 0, stationName);
    targetStation.linesOfStation.add(lineName);
    this._saveAllToLocalStorage();
  }
  deleteStation(nameToDelete) {
    const stationIndexToDelete = this._stations.findIndex(({ name }) => {
      return nameToDelete === name;
    });
    if (
      this._stations[stationIndexToDelete].linesOfStation.size >
      MAXIMUM_NUMBER__linesOF_STATION_TO_DELETE_STATION
    ) {
      alert(STATION_INCLUDE_IN_LINE_ERROR_MESSAGE);
      return;
    }
    this._stations.splice(stationIndexToDelete, 1);
    this._saveAllToLocalStorage();
  }
  deleteLine(nameToDelete) {
    const lineIndexToDelete = this._lines.findIndex(({ name }) => {
      return nameToDelete === name;
    });
    if (lineIndexToDelete === -1) {
      return;
    }
    this._deleteLineInAllStations(this._lines[lineIndexToDelete]);
    this._lines.splice(lineIndexToDelete, 1);
    this._saveAllToLocalStorage();
  }
  deleteSection(targetStationName, targetLineName) {
    const targetLine = this.getOneLineByCondition((line) => {
      return line.name === targetLineName;
    });
    if (targetLine.stationsOfLine.length <= MINIMUM_NUMBER__stationsOF_LINE) {
      alert(NOT_MINIMUM_NUMBER__stationsOF_LINE_ERROR_MESSAGE);
      return;
    }
    this._deleteLineInStation(targetStationName, targetLineName);
    this._deleteStationInLine(targetStationName, targetLineName);
    this._saveAllToLocalStorage();
  }
  getStationsNames() {
    const stationNames = [];
    this._stations.forEach(({ name }) => {
      stationNames.push(name);
    });
    return stationNames;
  }
  getOneStationINFOByCondition(condition) {
    for (let station of this._stations) {
      if (condition(station)) {
        return station;
      }
    }
    return -1;
  }
  getOneStationINFOByName(name) {
    for (let station of this._stations) {
      if (station.name === name) {
        return station;
      }
    }
    return -1;
  }
  getStationNamesByCondition(condition) {
    const returnStations = [];
    this._stations.forEach((station) => {
      if (condition(station)) {
        returnStations.push(station.name);
      }
    });
    return returnStations;
  }
  getLines() {
    const linesINFOs = [];
    this._lines.forEach(({ name, stationsOfLine }) => {
      linesINFOs.push({
        name: name,
        stationsOfLine: stationsOfLine,
      });
    });
    return linesINFOs;
  }
  getOneLineByName(name) {
    for (let line of this._lines) {
      if (line.name === name) {
        return line;
      }
    }
    return -1;
  }
  getOneLineByCondition(condition) {
    for (let line of this._lines) {
      if (condition(line)) {
        return line;
      }
    }
    return -1;
  }
  getAllLineByCondition(condition) {
    const returnlines = [];
    this._lines.forEach((line) => {
      if (condition(line)) {
        returnlines.push(line);
      }
    });
    return returnlines;
  }
  isNotOverlapNameInStationsArray(inputName) {
    const isValid = this._isNotOverlapName(this._stations, inputName);
    if (!isValid) {
      alert(OVERLAP_STATION_ERROR_MESSAGE);
    }
    return isValid;
  }
  isNotOverlapNameInLinesArray(inputName) {
    const isValid = this._isNotOverlapName(this._lines, inputName);
    if (!isValid) {
      alert(OVERLAP_LINE_ERROR_MESSAGE);
    }
    return isValid;
  }

  _loadAllFromLocalStorage() {
    const stations = JSON.parse(localStorage.getItem("stations"));
    const lines = JSON.parse(localStorage.getItem("lines"));
    stations.forEach((station) => {
      station.linesOfStation = new Set(station.linesOfStation);
    });
    this._stations = stations;
    this._lines = lines;
    console.log(stations);
    console.log(lines);
  }
  _saveAllToLocalStorage() {
    const jsonStations = JSON.stringify(this._stations, this._replacer);
    const jsonLines = JSON.stringify(this._lines);

    localStorage.setItem("stations", jsonStations);
    localStorage.setItem("lines", jsonLines);
  }
  _replacer(key, value) {
    if (value.__proto__.constructor.name === "Set") {
      return Array.from(value);
    }
    return value;
  }
  _isNotOverlapName(targetToFindOverlap, inputName) {
    const overlapIndex = targetToFindOverlap.findIndex(
      ({ name }) => name === inputName
    );
    return overlapIndex === -1;
  }
  _deleteLineInStation(targetStationName, targetLineName) {
    const targetStation = this.getOneStationINFOByCondition((station) => {
      return station.name === targetStationName;
    });
    targetStation.linesOfStation.delete(targetLineName);
  }
  _deleteStationInLine(targetStationName, targetLineName) {
    const targetLine = this.getOneLineByName(targetLineName);
    const targetStationIndex = targetLine.stationsOfLine.findIndex(
      (stationName) => {
        return stationName === targetStationName;
      }
    );
    targetLine.stationsOfLine.splice(targetStationIndex, 1);
  }
  _deleteLineInAllStations(lineToDelete) {
    const { name, stationsOfLine } = lineToDelete;
    stationsOfLine.forEach((stationName) => {
      const targetStation = this.getOneStationINFOByName(stationName);
      targetStation.linesOfStation.delete(name);
    });
  }
}

const OVERLAP_STATION_ERROR_MESSAGE = "기존 역 이름과 중복되는 이름입니다.";
const OVERLAP_LINE_ERROR_MESSAGE = "기존 노선 이름과 중복되는 이름입니다.";

const MINIMUM_NUMBER__stationsOF_LINE = 2;
const NOT_MINIMUM_NUMBER__stationsOF_LINE_ERROR_MESSAGE = `노선에는 최소 ${MINIMUM_NUMBER__stationsOF_LINE}개의 역이 포함되어 있어야합니다.`;
const MAXIMUM_NUMBER__linesOF_STATION_TO_DELETE_STATION = 0;
const STATION_INCLUDE_IN_LINE_ERROR_MESSAGE = `${MAXIMUM_NUMBER__linesOF_STATION_TO_DELETE_STATION + 1}개 이상의 노선에 포함되어 있는 역은 삭제할 수 없습니다.`;

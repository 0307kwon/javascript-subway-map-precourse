export default class Line {
  constructor(name, startStationName, endStationName) {
    this.name = name;
    this.stations = [startStationName, endStationName];
  }
}

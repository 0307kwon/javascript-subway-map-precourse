import LinesModel from "./lines-model.js";
import StationsModel from "./stations-model.js";

export default class Models {
  constructor() {
    this.stationsModel = new StationsModel();
    this.linesModel = new LinesModel();
  }
}

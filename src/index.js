import Models from "./models/models.js";
import { CONTAINER, MENUBAR, TEMPLATE } from "./common/common-const.js";
import StationManagerController from "./controller/station-manager-controller.js";
import LineManagerController from "./controller/line-manager-controller.js";
import SectionManagerController from "./controller/section-manager-controller.js";

import StationManagerView from "./views/station-manager-view.js";
import LineManagerView from "./views/line-manager-view.js";
import SectionManagerView from "./views/section-manager-view.js";

const models = new Models();

let contentsController;

function addClickEventByID(id, callbackFunction) {
  const button = document.getElementById(id);
  button.addEventListener("click", callbackFunction);
}

function initializeMenuabar() {
  const container = document.getElementById(CONTAINER.MENUBAR_ID);
  container.innerHTML = TEMPLATE.MENUBAR;
  addClickEventByID(MENUBAR.STATION_BUTTON_ID, () => {
    _setStationManagerController();
  });
  addClickEventByID(MENUBAR.LINE_BUTTON_ID, () => {
    _setLineManagerController();
  });
  addClickEventByID(MENUBAR.SECTION_BUTTON_ID, () => {
    _setSectionManagerController();
  });
}

function _setStationManagerController() {
  contentsController = new StationManagerController(
    new StationManagerView(CONTAINER.CONTENTS_ID),
    models
  );
}
function _setLineManagerController() {
  contentsController = new LineManagerController(
    new LineManagerView(CONTAINER.CONTENTS_ID),
    models
  );
}
function _setSectionManagerController() {
  contentsController = new SectionManagerController(
    new SectionManagerView(CONTAINER.CONTENTS_ID),
    models
  );
}

initializeMenuabar();

export const CONTAINER = {
  MENUBAR_ID: "menubar",
  CONTENTS_ID: "contents",
};

export const MENUBAR = {
  STATION_BUTTON_ID: "station-manager-button",
  LINE_BUTTON_ID: "line-manager-button",
  SECTION_BUTTON_ID: "section-manager-button",
  MAP_PRINT_BUTTON_ID: "map-print-manager-button",
};

export const STATION_MANAGER = {
  NAME_INPUT_ID: "station-name-input",
  ADD_BUTTON_ID: "station-add-button",
  DELETE_BUTTON_CLASS: "station-delete-button",
  TABLE_ID: "station-table",
};

export const LINE_MANAGER = {
  NAME_INPUT_ID: "line-name-input",
  START_SELECTOR_ID: "line-start-station-selector",
  END_SELECTOR_ID: "line-end-station-selector",
  ADD_BUTTON_ID: "line-add-button",
  DELETE_BUTTON_CLASS: "line-delete-button",
  TABLE_ID: "line-table",
};

export const SECTION_MANAGER = {
  BUTTON_CONTAINER_ID: "button-container",
  LINE_SELECT_BUTTON_CLASS: "section-line-menu-button",

  MANAGER_CONTAINER_ID: "section-manager-container",
  LINE_MANAGER_TITLE_ID: "line-manager-title",
  STATION_SELECTOR_ID: "section-station-selector",
  ORDER_INPUT_ID: "section-order-input",
  REGISTER_SECTION_BUTTON_ID: "section-add-button",
  DELETE_BUTTON_CLASS: "section-delete-button",
  TABLE_ID: "section-table",
};

export const INPUT_LIMIT = {
  MIN_STATION_NAME_LENGTH: 2,
  MIN_LINE_NAME_LENGTH: 1,
  MIN_STATIONS_OF_LINE: 2,
  MIN_ORDER_INDEX: 0,
};

export const ERROR_MESSAGE = {
  MIN_STATION_NAME_LENGTH: `최소 ${INPUT_LIMIT.MIN_STATION_NAME_LENGTH}자 이상이어야 합니다.`,
  HAS_OVERLAP_STATION_NAME: `이미 같은 이름의 역이 존재합니다.`,
  MIN_LINE_NAME_LENGTH: `최소 ${INPUT_LIMIT.MIN_LINE_NAME_LENGTH}자 이상이어야 합니다.`,
  NOT_SELECTED_OPTION: `콤보박스의 옵션을 선택해 주세요.`,
  HAS_OVERLAP_LINE_NAME: `이미 같은 이름의 노선이 존재합니다.`,
  MIN_STATIONS_OF_LINE: `최소 ${INPUT_LIMIT.MIN_STATIONS_OF_LINE}개의 역이 노선에 포함되어 있어야합니다.`,
  HAS_VALID_STATION_TO_DELETE: `노선에 포함된 노선은 삭제할 수 없습니다.`,
  START_STATION_SAME_TO_END: `상행 종점과 하행 종점이 같은 노선은 등록할 수 없습니다.`,
  NOT_NUMBER_INPUT: `숫자만 입력해 주십시오.`,
  NOT_MIN_ORDER_INDEX: `${INPUT_LIMIT.MIN_ORDER_INDEX}이상의 숫자를 입력해 주십시오.`,
};

export const CONFIRM_MESSAGE = {
  DELETE_CONFIRM: `정말로 삭제하시겠습니까?`,
};

export const TEMPLATE = {
  SELECTOR_DEFAULT_OPTION: `<option value="none">--선택--</option>`,

  MENUBAR: `
  <button id="${MENUBAR.STATION_BUTTON_ID}">역 관리</button>
  <button id="${MENUBAR.LINE_BUTTON_ID}">노선 관리</button>
  <button id="${MENUBAR.SECTION_BUTTON_ID}">구간 관리</button>
  <button id="${MENUBAR.MAP_PRINT_BUTTON_ID}">지하철 노선도 출력</button>
  `,

  STATION_MANAGER: `
  <span>역 이름</span><br>
  <input type="text" id="${STATION_MANAGER.NAME_INPUT_ID}" placeholder="역 이름을 입력해주세요."/>
  <button id="${STATION_MANAGER.ADD_BUTTON_ID}">역 추가</button>
  <h2>🚉지하철 역 목록</h2>
  <table border="1" id="${STATION_MANAGER.TABLE_ID}">
  </table>
  `,
  STATION_TABLE_HEADER: `
  <th>역 이름</th>
  <th>설정</th>
  `,

  LINE_MANAGER: `
  <span>노선 이름</span><br>
  <input type="text" id="${LINE_MANAGER.NAME_INPUT_ID}" placeholder="노선 이름을 입력해주세요"/>
  <p></p>
  <span>상행 종점</span>
  <select id="${LINE_MANAGER.START_SELECTOR_ID}">
  </select><br>
  <span>하행 종점</span>
  <select id="${LINE_MANAGER.END_SELECTOR_ID}">
  </select><br>
  <button id="${LINE_MANAGER.ADD_BUTTON_ID}">노선 추가</button>
  <h2>🚉지하철 노선 목록</h2>
  <table border="1" id="${LINE_MANAGER.TABLE_ID}">
  </table>
  `,
  LINE_TABLE_HEADER: `
  <th>노선 이름</th>
  <th>상행 종점역</th>
  <th>하행 종점역</th>
  <th>설정</th>
  `,

  SECTION_MANAGER: `
  <h2>구간을 수정할 노선을 선택해주세요.</h2>
  <div id="${SECTION_MANAGER.BUTTON_CONTAINER_ID}"></div>
  <div id="${SECTION_MANAGER.MANAGER_CONTAINER_ID}"></div>
  `,
  MAP_PRINT_MANAGER: `
  <p>mapPrintManager</p>
  `,
  SECTION_MANAGER_CONTAINER: `
  <h2 id="${SECTION_MANAGER.LINE_MANAGER_TITLE_ID}"></h2>
  <p>구간 등록</p>
  <select id="${SECTION_MANAGER.STATION_SELECTOR_ID}"}></select>
  <input type="number" id="${SECTION_MANAGER.ORDER_INPUT_ID}" placeholder="순서"/>
  <button id="${SECTION_MANAGER.REGISTER_SECTION_BUTTON_ID}">등록</button>
  <p></p>
  <table id="${SECTION_MANAGER.TABLE_ID}" border="1">
  </table>
  `,
  SECTION_TABLE_HEADER: `
  <th>순서</th>
  <th>이름</th>
  <th>설정</th>
  `,
};

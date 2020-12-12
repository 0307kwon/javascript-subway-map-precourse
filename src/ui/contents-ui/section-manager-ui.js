export default class SectionManagerUI {
  constructor({ contentsContainer, stationINFOManager }) {
    this.contentsContainer_ = contentsContainer;
    this.stationINFOManager_ = stationINFOManager;
    this.setHTML();
  }

  setHTML() {
    this.contentsContainer_.innerHTML = TEMPLATE;
    this.setStationSelector_(START_STATION_SELECTOR_ID);
    this.setStationSelector_(END_STATION_SELECTOR_ID);
    this.addEventToLineAddButton_();
  }

  setStationSelector_(selectorID) {
    const selector = this.contentsContainer_.querySelector("#" + selectorID);
    selector.innerHTML = this.createSelectorInnerHTML_();
  }
  createSelectorInnerHTML_() {
    const stationNames = this.stationINFOManager_.getStationsNames();
    let selectorInnerHTML = SELECTOR_TEMPLATE;
    stationNames.forEach((name) => {
      selectorInnerHTML += this.createNewSelectorOptionHTML_(name);
    });
    return selectorInnerHTML;
  }
  createNewSelectorOptionHTML_(name) {
    return `
    <option value="${name}">${name}</option>
    `;
  }
  addEventToLineAddButton_() {
    const button = this.contentsContainer_.querySelector("#" + ADD_BUTTON_ID);
    button.addEventListener("click", () => {
      this.stationINFOManager_.addNewLine({
        lineName: this.getHTMLElementByID_(NAME_INPUT_ID).value,
        startStationName: this.getSelectedOptionInSelector_(
          START_STATION_SELECTOR_ID
        ),
        endStationName: this.getSelectedOptionInSelector_(
          END_STATION_SELECTOR_ID
        ),
      });
    });
  }
  getHTMLElementByID_(id) {
    return this.contentsContainer_.querySelector("#" + id);
  }
  getSelectedOptionInSelector_(id) {
    const selector = this.getHTMLElementByID_(id);
    return selector[selector.selectedIndex].value;
  }
}
const NAME_INPUT_ID = "line-name-input";
const START_STATION_SELECTOR_ID = "line-start-station-selector";
const END_STATION_SELECTOR_ID = "line-end-station-selector";
const ADD_BUTTON_ID = "line-add-button";
const DELETE_BUTTON_CLASS = "line-delete-button";
const TABLE_ID = "line-table";
const SELECTOR_TEMPLATE = `<option value="none">--선택--</option>`;
const TEMPLATE = `
<span>노선 이름</span><br>
<input type="text" id="${NAME_INPUT_ID}" placeholder="노선 이름을 입력해주세요."/>
<p></p>
<span>상행 종점</span>
<select id="${START_STATION_SELECTOR_ID}">
</select><br>
<span>하행 종점</span>
<select id="${END_STATION_SELECTOR_ID}">
</select>
<p></p>
<button id="${ADD_BUTTON_ID}">노선추가</button>
<h2>🚉 지하철 노선 목록</h2>
<table border="1" id="${TABLE_ID}">
<th>노선 이름</th>
<th>상행 종점역</th>
<th>하행 종점역</th>
<th>설정</th>
<tr>
  <td>1</td>
  <td>2</td>
  <td>3</td>
  <td>
    <button class="${DELETE_BUTTON_CLASS}">삭제</button>
  </td>
<tr>
</table>
`;

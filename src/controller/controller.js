export default class Controller {
  constructor(view, models) {
    this._view = view;
    this._models = models;
  }

  addClickEventByID(id, callbackFunction) {
    const button = document.getElementById(id);
    button.addEventListener("click", callbackFunction);
  }
  getInputTextByID(id) {
    const input = document.getElementById(id);
    return input.value.trim();
  }
  getSelectorOptionByID(id) {
    const selector = document.getElementById(id);
    const selectedOption = selector.options[selector.selectedIndex].value;
    return selectedOption;
  }
}

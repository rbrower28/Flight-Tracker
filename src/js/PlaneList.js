import { renderListWithTemplate } from './utils';

export default class PlaneList {

  constructor(dataSrc, listElement) {
    this.dataSrc = dataSrc;
    this.listElement = listElement;
  }

  async init() {
    const list = await this.dataSrc.getPeopleData();
    this.renderList(list);
  }

  renderList(list) {
    this.listElement.innerHTML = '';
    const template = document.getElementById('person-data');
    renderListWithTemplate(template, this.listElement, list, this.doTemplate);
  }

  doTemplate(template, jet) {
    template.querySelector('a').href += jet.id;
    template.querySelector('img').src = './images/' + jet.img;
    template.querySelector('.item-name').innerHTML = jet.name;
    template.querySelector('.item-make').innerHTML = jet.make;
    template.querySelector('.item-id').innerHTML = jet.id;
    return template
  }
}
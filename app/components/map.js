import Component from '@glimmer/component';

export default class MapComponent extends Component {
  get src() {
    let { lat, lng, zoom } = this.args;

    let coordinates = `${lat},${lng}`;

    return `https://maps.google.com/maps?q=${coordinates}&z=${zoom}&amp;output=embed`
  }
}

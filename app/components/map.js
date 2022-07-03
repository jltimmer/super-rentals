import Component from '@glimmer/component';
import ENV from 'super-rentals/config/environment';

const GOOGLE_API = 'https://maps.googleapis.com/maps/api/staticmap?'

export default class MapComponent extends Component {
  get src() {
    let { lat, lng, width, height, zoom } = this.args;

    let coordinates = `${lat},${lng}`;
    let dimensions = `${width}x${height}`;
    let accessToken = `key=${this.token}`;

    return `${GOOGLE_API}&center=${coordinates}&zoom=${zoom}&size=${dimensions}&key=${accessToken}`
  }

  get token() {
    return encodeURIComponent(ENV.GOOGLE_ACCESS_TOKEN);
  }
}

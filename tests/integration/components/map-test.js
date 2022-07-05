import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | map', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a map image for the specified parameters', async function (assert) {
    await render(hbs`<Map
      @lat="37.7797"
      @lng="-122.4184"
      @zoom="10"
      @width="150"
      @height="120"
    />`);

    assert
      .dom('.map iframe')
      .exists()
      .hasAttribute('alt', 'Map image at coordinates 37.7797,-122.4184')
      .hasAttribute('src')
      .hasAttribute('width', '150')
      .hasAttribute('height', '120');

    let { src } = find('.map iframe');

    assert.ok(
      src.startsWith('https://maps.google.com/'),
      'the src starts with "https://maps.google.com/"'
    );

    assert.ok(
      src.includes('37.7797,-122.4184'),
      'the src should include the lat,lng parameter'
    );

    assert.ok(src.includes('10'), 'the src should include the zoom parameter');

    // assert.ok(
    //   .includes('150x120'),
    //   'the src should include the width,height parameter'
    // );
  });

  test('it updates the `src` attribute when the arguments change', async function (assert) {
    this.setProperties({
      lat: 37.7749,
      lng: -122.4194,
      zoom: 10,
      width: 150,
      height: 120,
    });

    await render(hbs`<Map
      @lat={{this.lat}}
      @lng={{this.lng}}
      @zoom={{this.zoom}}
      @width={{this.width}}
      @height={{this.height}}
    />`);

    let iframe = find('.map iframe');

    assert.ok(
      iframe.src.includes('37.7749,-122.4194'),
      'the src should include the lat,lng parameter'
    );

    assert.ok(
      iframe.src.includes('10'),
      'the src should include the zoom parameter'
    );

    this.setProperties({
      width: 300,
      height: 200,
      zoom: 12,
    });

    assert.ok(
      iframe.src.includes('37.7749,-122.4194'),
      'the src should include the lat,lng parameter'
    );

    assert.ok(
      iframe.src.includes('12'),
      'the src should include the zoom parameter'
    );

    this.setProperties({
      lat: 47.6062,
      lng: -122.3321,
    });

    assert.ok(
      iframe.src.includes('47.6062,-122.3321'),
      'the src should include the lat,lng parameter'
    );

    assert.ok(
      iframe.src.includes('12'),
      'the src should include the zoom parameter'
    );

    // assert.ok(
    //   src.includes('300x200@2x'),
    //   'the src should include the width,height and @2x parameter'
    // );
  });

  test('the default alt attribute can be overridden', async function (assert) {
    await render(hbs`<Map
      @lat="37.7797"
      @lng="-122.4184"
      @zoom="10"
      @width="150"
      @height="120"
      alt="A map of San Francisco"
    />`);

    assert.dom('.map iframe').hasAttribute('alt', 'A map of San Francisco');
  });

  test('the src, width and height attributes cannot be overridden', async function (assert) {
    await render(hbs`<Map
      @lat="37.7797"
      @lng="-122.4184"
      @zoom="10"
      @width="150"
      @height="120"
      src="/assets/images/teaching-tomster.png"
      width="200"
      height="300"
    />`);

    assert
      .dom('.map iframe')
      .hasAttribute('src', /^https:\/\/maps\.google\.com\//)
      .hasAttribute('width', '150')
      .hasAttribute('height', '120');
  });
});

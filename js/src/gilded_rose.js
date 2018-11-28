function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

var MIN_QUALITY = 0;
var MAX_QUALITY = 50;

function update_quality() {
  items.forEach(function(item) {
    var quality_delta = -1;

    // Legendary item, doesn't change
    if (item.name == 'Sulfuras, Hand of Ragnaros') {
      return;
    }

    // Expired items reduce quality twice as fast
    if (item.sell_in <= 0) {
      quality_delta *= 2;
    }

    // Conjured items reduce quality twice as fast
    if (item.name.startsWith("Conjured")) {
      quality_delta *= 2;
    }

    // Aged Brie improves with age
    if (item.name == 'Aged Brie') {
      quality_delta *= -1;
    }

    // Backstage passes have very specific quality-reduction logic
    if (item.name == 'Backstage passes to a TAFKAL80ETC concert') {
      if (item.sell_in <= 0) {
        quality_delta = -1 * item.quality;
      } else if (item.sell_in <= 5) {
        quality_delta = 3;
      } else if (item.sell_in <= 10) {
        quality_delta = 2;
      } else if (item.sell_in > 10) {
        quality_delta = 1;
      }
    }

    var new_quality = item.quality + quality_delta;
    new_quality = Math.max(new_quality, MIN_QUALITY);
    new_quality = Math.min(new_quality, MAX_QUALITY);

    item.quality = new_quality;
    item.sell_in = item.sell_in - 1;
  });
}

function set_items(_items) {
  items = _items;
}
function get_items(_items) {
  return items;
}

if (typeof module === 'object') {
  exports = module.exports = {Item, update_quality, set_items, get_items};
}

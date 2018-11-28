if (typeof require === 'function') {
  var {Item, update_quality, get_items, set_items} =
    require('../src/gilded_rose.js');
}

describe("Gilded Rose", function() {

  it("reduces sell-in when updated", () => {
    set_items([new Item("Teacup", 1, 1)]);
    update_quality();
    expect(get_items()[0].sell_in).toEqual(0);
  });

  it("reduces quality when updated", () => {
    set_items([new Item("Teacup", 1, 1)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(0);
  });

  it("reduces quality by 2 when sell-in expired", () => {
    set_items([new Item("Teacup", 0, 2)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(0);
  });

  it("does reduce sell-in to negative numbers", () => {
    set_items([new Item("Teacup", 0, 0)]);
    update_quality();
    expect(get_items()[0].sell_in).toEqual(-1);
  });

  it("doesnt reduce quality to negative", () => {
    set_items([new Item("Teacup", 1, 0)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(0);
  });

  it("doesnt reduce quality to negative when expired", () => {
    set_items([new Item("Teacup", 0, 0)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(0);
  });

  it("increases quality of Aged Brie over time", () => {
    set_items([new Item("Aged Brie", 5, 5)]);
    update_quality();
    expect(get_items()[0].sell_in).toEqual(4);
    expect(get_items()[0].quality).toEqual(6);
  });

  // Not obvious that this is correct from the spec
  // but this is what currently happens
  it("increase quality of Aged Brie twice as fast after sell-in", () => {
    set_items([new Item("Aged Brie", 0, 5)]);
    update_quality();
    expect(get_items()[0].sell_in).toEqual(-1);
    expect(get_items()[0].quality).toEqual(7);
  });

  it("won't increase quality past 50", () => {
    set_items([new Item("Aged Brie", 0, 50)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(50);
  });

  it("never changes sell-in or quality of Sulfuras", () => {
    set_items([new Item("Sulfuras, Hand of Ragnaros", 10, 80)]);
    update_quality();
    expect(get_items()[0].sell_in).toEqual(10);
    expect(get_items()[0].quality).toEqual(80);
  });

  it("increases quality of backstack passes over time", () => {
    set_items([new Item("Backstage passes to a TAFKAL80ETC concert", 20, 5)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(6);
  });

  it("increases quality of backstack passes by 2 within 6-10 days", () => {
    set_items([new Item("Backstage passes to a TAFKAL80ETC concert", 10, 5)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(7);

    set_items([new Item("Backstage passes to a TAFKAL80ETC concert", 6, 5)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(7);
  });

  it("increases quality of backstack passes by 3 within 1-5 days", () => {
    set_items([new Item("Backstage passes to a TAFKAL80ETC concert", 5, 5)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(8);

    set_items([new Item("Backstage passes to a TAFKAL80ETC concert", 1, 5)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(8);
  });

  it("drops quality to 0 for backstage passes after expiry", () => {
    set_items([new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(0);
  });

  it("reduces sell-in as normal for conjured items", () => {
    set_items([new Item("Conjured Teacup", 5, 5)]);
    update_quality();
    expect(get_items()[0].sell_in).toEqual(4);
  });

  it("reduces quality twice as fast for conjured items", () => {
    set_items([new Item("Conjured Umbrella", 5, 5)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(3);
  });

  it("reduces quality twice as fast for expired conjured items", () => {
    set_items([new Item("Conjured Coathanger", 0, 5)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(1);
  });

  it("doesnt reduce quality to negative for conjured items", () => {
    set_items([new Item("Conjured Sugar Jar", 5, 1)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(0);
  });

  it("doesnt reduce quality to negative for expired conjured items", () => {
    set_items([new Item("Conjured Coffee", 0, 3)]);
    update_quality();
    expect(get_items()[0].quality).toEqual(0);
  });

  it("applies adjustments to all items in the list", () => {
    set_items([
      new Item("Teacup", 1, 1),
      new Item("Aged Brie", 5, 5),
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20)
    ]);

    update_quality();

    expect(get_items()).toEqual([
      new Item("Teacup", 0, 0),
      new Item("Aged Brie", 4, 6),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 0)
    ]);
  });

});

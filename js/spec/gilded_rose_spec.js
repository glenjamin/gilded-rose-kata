if (typeof require === 'function') {
  var {Item, update_quality, getItems, setItems} =
    require('../src/gilded_rose.js');
}

describe("Gilded Rose", function() {

  it("should foo", function() {
    items = [ new Item("foo", 0, 0) ];
    update_quality();
    expect(items[0].name).toEqual("foo");
  });

});

// jshint esversion: 6

var itemId;
QUnit.test("test", function(assert) {

  var done = assert.async();

  var readDone = false;
  $.ajax({
    url: "/item/?name=", // URL der Abfrage,
    type: "GET"
  })
  .done (function( response) {
    readDone = true;
    assert.ok( undefined!==response, "GET succesful");
  })
  .fail (function( xhr, status, errorThrown ) {
    assert.ok(false, "GET failed, error: " + errorThrown);
  })
  .always (function( xhr, status ) {
    assert.ok(readDone, "ajax done with response...");
    done();
  });
});

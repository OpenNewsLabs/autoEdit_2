var autoEdit2API = require("../backEnd_node/autoEdit2API.js")

describe("autoEdit2API create", function() {

 beforeEach(function() {
 	this.API = new autoEdit2API();
  this.model = {};
 });

 afterEach(function() {
    this.API ={};
 });

  it("contains spec with an expectation", function() {


    expect(this.API.create(this.model)).toBe("path_to_video");

  });


});



xdescribe("autoEdit2API Read", function() {
  xit("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });


});

xdescribe("autoEdit2API Update", function() {
  xit("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });


});


xdescribe("autoEdit2API Delete", function() {
  xit("contains spec with an expectation", function() {
    expect(true).toBe(true);
  });


});
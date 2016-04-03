"use strict";

var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var j2r = require("../index");
var create = function(){};

describe("validations", function(){
  describe("schema type", function(){
    validValues(it, [{type:"div"}, "a string"]);
    invalidValues(it,
      [undefined, null, true, false, 0, 1, 1.1, function(){}, []],
      "schema must be a string or an plain object"
    );
  });

  describe("schema.type", function(){
    validValues(it, ["notEmptyString", "\r\tWillBeTrimmed \n"]);
    invalidValues(it,
      [
        { type: undefined }, { type: null }, { type: false }, { type: true },
        { type: 0 }, { type: 1 }, { type: 1.1 }, { type: function(){} },
        { type: [] }, { type: {} }, { type: "\n\r\t" }, { type: "" },
      ],
      "schema.type must be a string and must have a non-empty value"
    );
    it("should be trimmed", function(){
      var spy = sinon.spy();
      j2r(spy, { type: "\r\tWillBeTrimmed \n" })
      expect(spy.args[0][0]).to.be.equal("WillBeTrimmed");
    });
  });

  describe("schema.props", function(){
    validValues(it, [{ type: "div" }, { type: "div", props: {} }]);
    invalidValues(it,
      [
        { type: "div", props: null },
        { type: "div", props: false },
        { type: "div", props: true },
        { type: "div", props: 0 },
        { type: "div", props: 1 },
        { type: "div", props: 1.1 },
        { type: "div", props: function(){} },
        { type: "div", props: [] },
        { type: "div", props: "\n\r\t" },
        { type: "div", props: "" },
      ],
      "schema.props must be an plain object"
    );
  });
});

function validValues(it, values, description) {
  description = description || "should be valid with: ";
  values.forEach(function(value){
    var desc = description + (typeof value) + " " + (JSON.stringify(value));
    it(desc, function(){
      expect(function(){
        j2r(create, value);
      }).to.not.throw();
    });
  });
}

function invalidValues(it, values, error, description) {
  description = description || "should not be valid with: ";
  values.forEach(function(value){
    var desc = description + (typeof value) + " " + (JSON.stringify(value));
    it(desc, function(){
      expect(function(){
        j2r(create, value);
      }).to.throw(error);
    });
  });
}

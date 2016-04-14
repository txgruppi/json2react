"use strict";

var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var j2r = require("../index");

const subject = {
  type: "um",
  props: {
    key: "myKey", ref: "myRef", className: "some-class", id: "some-id",
  },
  children: [
    { type: "dois" },
    {
      type: "tres",
      props: {
        key: "myKey", ref: "myRef", className: "some-class", id: "some-id",
      },
      children: [
        { type: "quatro" },
        {
          type: "cinco",
          props: {
            key: "sKey", ref: "sRef", className: "s-class", id: "s-id",
          },
        },
      ],
    },
  ],
};

describe("mapTypeToComponent", function(){
  it("should call mapTypeToComponent for every element", function(){
    const identity = (type) => type;
    const spy = sinon.spy(identity);
    j2r(function(){}, spy, subject);
    expect(spy.args.length).to.be.equal(5);
    expect(
      spy.args.map((arg) => arg[0])
    ).to.be.deep.equal(["dois", "quatro", "cinco", "tres", "um"]);
  });

  it("should use the values returned by the mapper function", function(){
    function create(type, props)  {
      const children = Array.prototype.slice.call(arguments, 2);
      let rs = { type };
      if (children[0] !== undefined) {
        rs.children = children;
      }
      return rs;
    };
    const reverse = (type, props) => type.split("").reverse().join("");
    const actual = j2r(create, reverse, subject);
    expect(actual).to.be.deep.equal({
      type: "mu",
      children: [
        { type: "siod" },
        {
          type: "sert",
          children: [
            { type: "ortauq" },
            { type: "ocnic" },
          ],
        },
      ],
    });
  });
});

"use strict";

var chai = require("chai");
var expect = chai.expect;
var sinon = require("sinon");
var j2r = require("../index");

var tests = [
  {
    subject: { type: "div" },
    calls: [ [ "div" ] ],
  },
  {
    subject: {
      type: "div",
      props: {
        key: "myKey", ref: "myRef", className: "some-class", id: "some-id",
      },
    },
    calls: [
      [
        "div",
        { key: "myKey", ref: "myRef", className: "some-class", id: "some-id" },
      ],
    ],
  },
  {
    subject: {
      type: "div",
      children: "Some text",
    },
    calls: [
      [ "div", null, "Some text" ],
    ],
  },
  {
    subject: {
      type: "div",
      props: {
        key: "myKey", ref: "myRef", className: "some-class", id: "some-id",
      },
      children: "Some text",
    },
    calls: [
      [
        "div",
        { key: "myKey", ref: "myRef", className: "some-class", id: "some-id" },
        "Some text",
      ],
    ],
  },
  {
    subject: {
      type: "div",
      props: {
        key: "myKey", ref: "myRef", className: "some-class", id: "some-id",
      },
      children: { type: "div" },
    },
    calls: [
      [ "div" ],
      [
        "div",
        { key: "myKey", ref: "myRef", className: "some-class", id: "some-id" },
        0,
      ],
    ],
  },
  {
    subject: {
      type: "div",
      props: {
        key: "myKey", ref: "myRef", className: "some-class", id: "some-id",
      },
      children: [
        { type: "div" },
        {
          type: "div",
          props: {
            key: "myKey", ref: "myRef", className: "some-class", id: "some-id",
          },
        },
      ]
    },
    calls: [
      [ "div" ],
      [
        "div",
        { key: "myKey", ref: "myRef", className: "some-class", id: "some-id" },
      ],
      [
        "div",
        { key: "myKey", ref: "myRef", className: "some-class", id: "some-id" },
        0, 1,
      ],
    ],
  },
  {
    subject: {
      type: "div",
      props: {
        key: "myKey", ref: "myRef", className: "some-class", id: "some-id",
      },
      children: [
        { type: "div" },
        {
          type: "div",
          props: {
            key: "myKey", ref: "myRef", className: "some-class", id: "some-id",
          },
          children: [
            { type: "span" },
            {
              type: "span",
              props: {
                key: "sKey", ref: "sRef", className: "s-class", id: "s-id",
              },
            },
          ],
        },
      ],
    },
    calls: [
      [ "div" ],
      [ "span" ],
      [
        "span",
        { key: "sKey", ref: "sRef", className: "s-class", id: "s-id" },
      ],
      [
        "div",
        { key: "myKey", ref: "myRef", className: "some-class", id: "some-id" },
        1, 2,
      ],
      [
        "div",
        { key: "myKey", ref: "myRef", className: "some-class", id: "some-id" },
        0, 3,
      ],
    ],
  },
];

describe("create calls", function(){
  tests.forEach(function(test, index){
    it("should work for test " + index, function(){
      var counter = 0;
      function inc(){ return counter++; };
      var spy = sinon.spy(inc);
      j2r(spy, test.subject);
      expect(spy.args.length).to.be.equal(test.calls.length);
      test.calls.forEach(function(call, index){
        expect(clear(spy.args[index])).to.be.deep.equal(call);
      });
    });
  });
});

function clear(args) {
  for (var i = args.length - 1; i >= 0; i--) {
    if (args[i] !== undefined && args[i] !== null) {
      return args;
    }
    args.pop();
  }
  return args;
}

"use strict";

module.exports = function json2react(create, schema) {
  if (typeof schema === "string") {
    return schema;
  }
  if (!isValidObject(schema)) {
    throw new Error("schema must be a string or an plain object");
  }
  if (
    !schema.type ||
    typeof schema.type !== "string" ||
    (schema.type = schema.type.trim()) === ""
  ) {
    throw new Error(
      "schema.type must be a string and must have a non-empty value"
    );
  }
  if (schema.props !== undefined && !isValidObject(schema.props)) {
    throw new Error("schema.props must be an plain object");
  }
  var type = schema.type;
  var props = schema.props || null;
  var children = schema.children && [].concat(
    schema.children
  ).map(function(child){
    return json2react(create, child);
  });

  return create.apply(create, [].concat([type, props]).concat(children));
}

function isValidObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

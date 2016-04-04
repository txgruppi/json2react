'use strict';

function json2react(create, schema) {
  if (typeof schema === 'string') {
    return schema;
  }

  if (!isPlainObject(schema)) {
    throw new Error('schema must be a string or a plain object')
  }

  var hasNonEmptySchemaType = (
    schema.type &&
    typeof schema.type === 'string' &&
    schema.type.trim() !== ''
  )

  if (! hasNonEmptySchemaType) {
    throw new Error('schema.type must be a non-empty string')
  }

  schema.type = schema.type.trim()

  if (schema.props !== undefined && !isPlainObject(schema.props)) {
    throw new Error('schema.props must be a plain object');
  }

  var type = schema.type;
  var props = schema.props || null;
  var children = schema.children && [].concat(schema.children).map(json2react.bind(null, create));

  return create.apply(create, [].concat([type, props]).concat(children));
}

function isPlainObject(maybe) {
  return (
    maybe !== null &&
    typeof maybe === 'object' &&
    Object.prototype.toString.call(maybe) == '[object Object]'
  );
}

module.exports = json2react;

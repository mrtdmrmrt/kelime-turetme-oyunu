/**
 * typeOf()
 * If you need a real typeof function
 *
 * @param {Object} obj
 * @returns Object type as a string
 * 'array', 'object', 'string', 'date', 'number', 'function', 'regexp', 'boolean', 'null', 'undefined'
 */
export const typeOf = function (obj) {
  return Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
};

// -----------------------------------------------------------------------------
// isNil
// This snippet can be used to check whether a value is null or undefined.
//
// isNil(null); // true
// isNil(undefined); // true

export const isNil = (val) => val === undefined || val === null;

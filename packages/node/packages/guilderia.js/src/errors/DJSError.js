'use strict';

// Heavily inspired by node's `internal/errors` module
const { ErrorCodes } = require('./ErrorCodes.js');
const { Messages } = require('./Messages.js');

/**
 * Extend an error of some sort into a GuilderiajsError.
 *
 * @param {Error} Base Base error to extend
 * @returns {GuilderiajsError}
 * @ignore
 */
function makeGuilderiajsError(Base) {
  return class extends Base {
    static {
      Object.defineProperty(this, 'name', { value: `Guilderiajs${Base.name}` });
    }

    constructor(code, ...args) {
      super(message(code, args));
      this.code = code;
      Error.captureStackTrace(this, this.constructor);
    }

    get name() {
      return `${this.constructor.name} [${this.code}]`;
    }
  };
}

/**
 * Format the message for an error.
 *
 * @param {string} code The error code
 * @param {Array<*>} args Arguments to pass for util format or as function args
 * @returns {string} Formatted string
 * @ignore
 */
function message(code, args) {
  if (!(code in ErrorCodes)) throw new Error('Error code must be a valid GuilderiajsErrorCodes');
  const msg = Messages[code];
  if (!msg) throw new Error(`No message associated with error code: ${code}.`);
  if (typeof msg === 'function') return msg(...args);
  if (!args?.length) return msg;
  args.unshift(msg);
  return String(...args);
}

exports.GuilderiajsError = makeGuilderiajsError(Error);
exports.GuilderiajsTypeError = makeGuilderiajsError(TypeError);
exports.GuilderiajsRangeError = makeGuilderiajsError(RangeError);

'use strict';

const util = require('./util');

module.exports = {
  Client: require('./client'),
  register(id) {
    return util.register(`guilderia-${id}`);
  },
};

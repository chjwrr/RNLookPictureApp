const utils = require('./utils');

const Bmob = global.Bmob || {};
Bmob.utils = utils;
Bmob._config = utils.getConfig();
Bmob.initialize = (applicationId, applicationKey, masterKey) => {
  Bmob._config.applicationId = applicationId
  Bmob._config.applicationKey = applicationKey
  Bmob._config.applicationMasterKey = masterKey
};
Bmob.initialize("6cde973400d86adb4401f3201c144567", "6f09b6d507122c88555bda27f0916c1e");

module.exports = Bmob

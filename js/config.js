var _spc = _spc || {};
_spc.Config = function (configuration) {

    var config = configuration;

    function tryGet(field, defaultValue) {
        return config && config[field] ? config[field] : defaultValue;
    }

    this.serverHost = tryGet('serverHost', "http://localhost:3000");
    this.cacheSize = tryGet('cacheSize', 10); // items
    this.cacheTimeout = tryGet('cacheTimeout', 10); // in seconds
};



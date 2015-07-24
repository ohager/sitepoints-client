var _spc = _spc || {};
_spc.Config = function (configuration) {

    var config = configuration;

    function tryGet(field, defaultValue) {
        return config && config[field] ? config[field] : defaultValue;
    }

    this.serverHost = tryGet('serverHost', "http://localhost:3000");
    this.cacheSize = tryGet('cacheSize', 10); // items
    this.cacheTimeout = tryGet('cacheTimeout', 10); // in seconds
    this.mouseTracking = tryGet('mouseTracking', true);
    this.trackingInterval = tryGet('trackingInterval', 1000); // in milliseconds
    this.apikey = tryGet('apikey', null);
    this.onflush = tryGet('onflush', null);
    this.verbose = tryGet('verbose', false);
};


